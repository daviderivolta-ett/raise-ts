import { PoiProperty, PoiType, PointOfInterest } from '../models/poi.model';
import { Layer } from '../models/layer.model';
import { Tab } from '../models/tab.model';

import { EventObservable } from '../observables/event.observable';
import { TabsObservable } from '../observables/tabs.observable';
import { DataService } from './data.service';
import { LngLat, LngLatLike, MapGeoJSONFeature } from 'maplibre-gl';

export class PoiService {
    private static _instance: PoiService;
    private _selectedPoi: PointOfInterest | null = null;

    constructor() {
        if (PoiService._instance) return PoiService._instance;
        PoiService._instance = this;
    }

    static get instance(): PoiService {
        if (!PoiService._instance) PoiService._instance = new PoiService();
        return PoiService._instance;
    }

    public get selectedPoi(): PointOfInterest | null {
        return this._selectedPoi;
    }

    public set selectedPoi(selectedPoi: PointOfInterest | null) {
        this._selectedPoi = selectedPoi;
        EventObservable.instance.publish('selected-poi', this.selectedPoi);
        if (this._selectedPoi !== null) TabsObservable.instance.currentTab = Tab.Info;
    }

    public createPoiFromFeature(feature: MapGeoJSONFeature): PointOfInterest {        
        let poi: PointOfInterest = PointOfInterest.createEmpty();

        poi.position = this.getCoordinatesFromFeature(feature);

        const properties: Record<string, any> = {};

        for (const key in feature.properties) {
            if (Object.prototype.hasOwnProperty.call(feature.properties, key)) {
                const value: any = feature.properties[key];

                if (typeof value === 'string') {
                    try {
                        properties[key] = JSON.parse(value);
                    } catch (e) {
                        properties[key] = value;
                    }
                } else {
                    properties[key] = value;
                }

            }
        }

        for (const key in properties) {
            if (Object.prototype.hasOwnProperty.call(properties, key)) {
                switch (key) {
                    case 'uuid':
                        poi.uuid = properties[key];
                        break;
                    case 'name':
                        poi.name = properties[key];
                        break;
                    case 'layerName':
                        poi.layerName = properties[key];
                        const layer: Layer | undefined = DataService.instance.filterLayersByLayerName(properties[key]);
                        if (layer) poi.layer = layer;
                        break;

                    default:
                        let rawProp: any = properties[key];
                        poi.props.push(this.parsePoiProperty(rawProp));
                        break;
                }
            }
        }

        poi.type = this.getPoiType(feature); 
        console.log(poi);            
        return poi;
    }

    private getCoordinatesFromFeature(feature: MapGeoJSONFeature): LngLat {
        const coordinates: number[] | number[][] | number[][][] = (feature as any).geometry.coordinates;

        let position: LngLat = new LngLat(0.0, 0.0);

        if (Array.isArray(coordinates)) {
            if (coordinates.length > 0) {
                if (Array.isArray(coordinates[0])) {
                    if (coordinates[0].length > 0 && Array.isArray(coordinates[0][0])) {
                        position = this.calculateCentroid(coordinates[0] as number[][]);
                    } else {
                        position = this.calculateCentroid(coordinates as number[][]);
                    }
                } else {
                    position = LngLat.convert(coordinates as LngLatLike);
                }
            }
        }

        return position;
    }

    private calculateCentroid(coordinates: number[][]): LngLat {
        let sumLng = 0;
        let sumLat = 0;
        const numPoints = coordinates.length;

        for (const coord of coordinates) {
            sumLng += coord[0];
            sumLat += coord[1];
        }

        const avgLng = sumLng / numPoints;
        const avgLat = sumLat / numPoints;

        return new LngLat(avgLng, avgLat);
    }

    private parsePoiProperty(rawProp: any): PoiProperty {
        let prop: PoiProperty = PoiProperty.createEmpty();
        if (rawProp.displayName) prop.displayName = rawProp.displayName;
        if (rawProp.type) prop.type = rawProp.type;
        if (rawProp.value) prop.value = rawProp.value;
        return prop;
    }

    private getPoiType(feature: MapGeoJSONFeature): PoiType {
        if (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString') return PoiType.Polyline;
        if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') return PoiType.Polygon;
        return PoiType.Point
    }
}