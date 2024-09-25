import { Layer, LayerProperty, LayerStyle } from '../models/layer.model';
import { Feature, FeatureGeometryType } from '../models/feature.model';
import { PointOfInterest } from '../models/poi.model';
import { CircleLayerSpecification, FillLayerSpecification, LineLayerSpecification, LngLat } from 'maplibre-gl';

export class MapService {
    private static _instance: MapService;

    constructor() {
        if (MapService._instance) return MapService._instance;
        MapService._instance = this;
    }

    static get instance(): MapService {
        if (!MapService._instance) MapService._instance = new MapService();
        return MapService._instance;
    }

    public async createGeoJsonFromLayer(layer: Layer): Promise<any> {
        const url = `${layer.url}?service=WFS&typeName=${layer.layer}&outputFormat=application/json&request=GetFeature&srsname=EPSG:4326`;
        const res: Response = await fetch(url);
        let geoJson: any = await res.json();
        let geoJsonNewProp: any = this.substituteRelevantProperties(geoJson, layer);
        let geoJsonAddProp = this.createFeatureAdditionalProperties(geoJsonNewProp, layer);
        return geoJsonAddProp;
    }

    public async createGeoJSONs(layer: Layer): Promise<any[]> {
        let geoJSONs: any[] = [];
        try {
            const url: string = `${layer.url}?service=WFS&typeName=${layer.layer}&outputFormat=application/json&request=GetFeature&srsname=EPSG:4326`;
            const res: Response = await fetch(url);
            let data: any = await res.json();

            if (this.checkGeoJSON(data)) {
                geoJSONs = [...this.splitGeoJSON(data)];
            }

            return geoJSONs;
        } catch (error) {
            throw new Error('Errore nella creazione del GeoJSON');
        }
    }

    private checkGeoJSON(obj: any): boolean {
        if (!obj || typeof obj !== 'object' || !obj.type) {
            return false;
        }

        if (obj.type === 'Feature') {
            return !!obj.geometry;
        }

        if (obj.type === 'FeatureCollection') {
            if (!Array.isArray(obj.features)) {
                return false;
            }

            for (const feature of obj.features) {
                if (!feature.geometry) {
                    return false;
                }
            }

            return true;
        }

        return false;
    }

    private splitGeoJSON(obj: any): any[] {
        const geoJSONs: any[] = [];
        const geometryTypesMap: { [geometryType: string]: any } = {};

        if (obj.type === 'Feature') geoJSONs.push(obj);
        if (obj.type === 'FeatureCollection') {
            obj.features.forEach((feature: Feature) => {
                const geometryType: FeatureGeometryType = feature.geometry.type;
                if (!geometryTypesMap[geometryType]) {
                    geometryTypesMap[geometryType] = {
                        type: 'FeatureCollection',
                        features: []
                    }
                }

                geometryTypesMap[geometryType].features.push(feature);

            });

            Object.keys(geometryTypesMap).forEach((geometryType) => {
                geoJSONs.push(geometryTypesMap[geometryType]);
            });
        }

        return geoJSONs;
    }

    public getGeoJSONLayerSpecificationType(geometryType: FeatureGeometryType): 'circle' | 'line' | 'fill' {
        let type: 'circle' | 'line' | 'fill' = 'fill';

        switch (geometryType) {
            case 'Point':
            case 'MultiPoint':
                type = 'circle';
                break;
            case 'LineString':
            case 'MultiLineString':
                type = 'line';
                break;
            case 'Polygon':
            case 'MultiPolygon':
                type = 'fill';
                break;
        }

        return type;
    }

    public createGeoJSONLayerSpecification(id: string, type: 'circle' | 'line' | 'fill', style: LayerStyle): CircleLayerSpecification | LineLayerSpecification | FillLayerSpecification {
        switch (type) {
            case 'circle':
                const circleLayerSpec: CircleLayerSpecification = {
                    id,
                    type,
                    source: id,
                    paint: {
                        "circle-radius": 8,
                        "circle-color": style.color,
                        "circle-opacity": .5,
                        "circle-stroke-color": style.color,
                        "circle-stroke-opacity": 1,
                        "circle-stroke-width": 2
                    }
                }
                return circleLayerSpec;

            case 'line':
                const lineLayerSpec: LineLayerSpecification = {
                    id,
                    type,
                    source: id,
                    paint: {
                        "line-color": style.color,
                        "line-width": 4
                    }
                }
                return lineLayerSpec;

            case 'fill':
                const fillLayerSpec: FillLayerSpecification = {
                    id,
                    type,
                    source: id,
                    paint: {
                        "fill-color": style.color,
                        "fill-opacity": .5,
                        "fill-outline-color": style.color
                    }
                }
                return fillLayerSpec;
        }

    }

    private createGeojsonFeatureFromPoi(poi: PointOfInterest): any {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [poi.position.lng, poi.position.lat]
            },
            properties: {}
        }
    }

    public createGeojsonFeatureCollectionFromPois(pois: PointOfInterest[]): any {
        let geoJson: any = {
            type: 'FeatureCollection',
            features: []
        }

        let features: any = pois.map((poi: PointOfInterest) => this.createGeojsonFeatureFromPoi(poi));
        geoJson.features = features;
        return geoJson;
    }

    private createFeatureAdditionalProperties(geoJson: any, layer: Layer): any {
        geoJson.features = geoJson.features
            .filter((f: Feature) => f.geometry && f.geometry.type)
            .map((f: Feature, i: number) => {
                f.properties.name = layer.name + ' ' + i;
                f.properties.layerName = layer.layer;


                switch (f.geometry.type) {
                    case FeatureGeometryType.Point:
                        f.properties.uuid = layer.layer + f.geometry.coordinates[1] + f.geometry.coordinates[0];
                        break;

                    case FeatureGeometryType.MultiPoint:
                        f.properties.uuid = layer.layer + (f.geometry.coordinates as number[][])[0][1] + (f.geometry.coordinates as number[][])[0][0];
                        break;

                    case FeatureGeometryType.LineString || FeatureGeometryType.Polygon || FeatureGeometryType.MultiPoint:
                        f.properties.uuid = layer.layer + (f.geometry.coordinates as number[][])[0][1] + (f.geometry.coordinates as number[][])[0][0];
                        break;

                    default:
                        f.properties.uuid = layer.layer + (f.geometry.coordinates as number[][][])[0][0][1] + (f.geometry.coordinates as number[][][])[0][0][0];
                        break;
                }

                f.properties.uuid = f.id; // TESTING

                return f;
            });
        return geoJson;
    }

    private substituteRelevantProperties(geoJsonObj: any, layer: Layer) {
        geoJsonObj.features.forEach((feature: any) => {
            const newProperties: any = {};

            for (const key in feature.properties) {
                const relevantProperty = layer.relevantProperties.find((prop: LayerProperty) => prop.propertyName === key);
                if (relevantProperty) {
                    const newPropertyValue = {
                        displayName: relevantProperty.displayName,
                        type: relevantProperty.type,
                        value: feature.properties[key]
                    };
                    newProperties[key] = newPropertyValue;
                }
            }
            feature.properties = newProperties;
        });

        return geoJsonObj;
    }

    public openGoogleMaps(position: LngLat): void {
        const url: string = `https://www.google.it/maps/dir/?api=1&destination=${position.lat},${position.lng}`;
        window.open(url, '_blank');
    }

    public async getAddressFromCoordinates(lngLat: LngLat, signal: AbortSignal): Promise<string> {
        const res: Response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lngLat.lat}&lon=${lngLat.lng}&format=json`, { signal });
        const data: any = await res.json();
        let address: string = ``;
        if (data.address) {
            if (data.address.road) address += data.address.road + ', ';
            if (data.address.house_number) address += data.address.house_number + ', ';
            if (data.address.postcode) address += data.address.postcode + ' ';
            if (data.address.city) address += data.address.city + ' ';
        }
        address = address.trim();
        return address;
    }
}