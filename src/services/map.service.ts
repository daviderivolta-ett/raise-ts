import { Layer, LayerProperty, LayerStyle } from '../models/layer.model';
import { Feature, FeatureGeometryType } from '../models/feature.model';
import { PointOfInterest } from '../models/poi.model';
import { CircleLayerSpecification, FillLayerSpecification, LineLayerSpecification, LngLat, MapGeoJSONFeature } from 'maplibre-gl';

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
        try {
            const url = `${layer.url}?service=WFS&typeName=${layer.id}&outputFormat=application/json&request=GetFeature&srsname=EPSG:4326`;
            const res: Response = await fetch(url);

            if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.statusText}`);
            }

            let geoJson: any = await res.json();
            let geoJsonNewProp: any = this.substituteRelevantProperties(geoJson, layer);
            let geoJsonAddProp = this.createFeatureAdditionalProperties(geoJsonNewProp, layer);

            return geoJsonAddProp;
        } catch (error) {
            console.error('Error creating GeoJSON:', error);
            throw error;
        }
    }

    public async createGeoJSONs(layer: Layer): Promise<any[]> {
        let geoJSONs: any[] = [];
        try {
            const url: string = `${layer.url}?service=WFS&typeName=${layer.id}&outputFormat=application/json&request=GetFeature&srsname=EPSG:4326`;
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

    public checkGeoJSON(obj: any): boolean {
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

    public getGeoJsonCenter(geoJson: any): LngLat {
        let totalLng: number = 0;
        let totalLat: number = 0;
        let count: number = 0;

        if (geoJson.type === 'FeatureCollection' && Array.isArray(geoJson.features)) {
            geoJson.features.forEach((feature: any) => {
                const coordinates: any = feature.geometry.coordinates;
                if (Array.isArray(coordinates[0][0])) {
                    coordinates.forEach((coordSet: any) => {
                        coordSet.forEach((coord: any) => {
                            totalLng += coord[0];
                            totalLat += coord[1];
                            count++;
                        });
                    });
                } else {
                    coordinates.forEach((coord: any) => {
                        totalLng += coord[0];
                        totalLat += coord[1];
                        count++;
                    });
                }
            });
        } else if (geoJson.type === 'Feature') {
            const coordinates: any = geoJson.geometry.coordinates;
            if (Array.isArray(coordinates[0][0])) {
                coordinates.forEach((coordSet: any) => {
                    coordSet.forEach((coord: any) => {
                        totalLng += coord[0];
                        totalLat += coord[1];
                        count++;
                    });
                });
            } else {
                coordinates.forEach((coord: any) => {
                    totalLng += coord[0];
                    totalLat += coord[1];
                    count++;
                });
            }
        }

        const centerLng = totalLng / count;
        const centerLat = totalLat / count;

        return new LngLat(centerLng, centerLat);
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

    public createGeoJsonLineStringFromCoordinates(coords: [number, number][]): any {
        return {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: coords.map((couple: [number, number]) => [couple[1], couple[0]])
            },
            properties: {}
        }
    }

    private createFeatureAdditionalProperties(geoJson: any, layer: Layer): any {
        geoJson.features = geoJson.features
            .filter((f: Feature) => f.geometry && f.geometry.type)
            .map((f: Feature, i: number) => {
                f.properties.name = layer.name + ' ' + i;
                f.properties.layerName = layer.id;


                switch (f.geometry.type) {
                    case FeatureGeometryType.Point:
                        f.properties.uuid = layer.id + f.geometry.coordinates[1] + f.geometry.coordinates[0];
                        break;

                    case FeatureGeometryType.MultiPoint:
                        f.properties.uuid = layer.id + (f.geometry.coordinates as number[][])[0][1] + (f.geometry.coordinates as number[][])[0][0];
                        break;

                    case FeatureGeometryType.LineString || FeatureGeometryType.Polygon || FeatureGeometryType.MultiPoint:
                        f.properties.uuid = layer.id + (f.geometry.coordinates as number[][])[0][1] + (f.geometry.coordinates as number[][])[0][0];
                        break;

                    default:
                        f.properties.uuid = layer.id + (f.geometry.coordinates as number[][][])[0][0][1] + (f.geometry.coordinates as number[][][])[0][0][0];
                        break;
                }

                // f.properties.uuid = f.id; // TESTING

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
                        propertyName: relevantProperty.propertyName,
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

    public getFeatureProperties(feature: MapGeoJSONFeature): Record<string, any> {
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

        return properties;
    }

    public openGoogleMaps(pois: PointOfInterest[]): void {
        const url: string = `https://www.google.it/maps/dir/?api=1&origin=My+Location${this.generateGoogleMapsUrl(pois)}`;
        window.open(url, '_blank');
    }

    private generateGoogleMapsUrl(pois: PointOfInterest[]): string {
        const poisLatLng: string[] = pois.map((poi: PointOfInterest) => `${poi.position.lat},${poi.position.lng}`);
        let destinationUrl: string = '&destination=';
        let waypointsUrl: string = '&waypoints=';

        if (poisLatLng.length > 1) {
            const lastLatLng: string | undefined = poisLatLng.pop();
            waypointsUrl = waypointsUrl.concat(poisLatLng.join('|'));
            return destinationUrl + lastLatLng + waypointsUrl;
        } else {
            return '&destination=' + poisLatLng;
        }
    }

    public async getOptimalPath(pois: PointOfInterest[]): Promise<any> {
        const poisLatLng: [number, number][] = pois.map((poi: PointOfInterest) => [poi.position.lat, poi.position.lng]);
        try {
            // const res: Response = await fetch('./GeoJson/optimal-path.geojson');
            const res: Response = await fetch('http://labopt.iasi.cnr.it:4206/multiple-shortest-path/', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ list_of_coords: poisLatLng, attribute: 'length' })
            })
            console.log(res);
            // const geoJSON: any = await res.json();
            const geoJSON: any = this.createGeoJsonLineStringFromCoordinates(poisLatLng);
            return geoJSON;
        } catch (error) {
            throw new Error('Impossibile recuperare il percorso ottimo');
        }
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
        return address.trim();
    }
}