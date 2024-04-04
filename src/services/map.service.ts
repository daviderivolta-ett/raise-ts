import * as Cesium from 'cesium';

import { Layer, LayerProperty, LayerStyle } from '../models/layer.model';
import { Feature, FeatureGeometryType } from '../models/feature.model';
import { PointOfInterest } from '../models/poi.model';

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

    public async createGeoJson(layer: Layer): Promise<any> {
        const url = `${layer.url}?service=WFS&typeName=${layer.layer}&outputFormat=application/json&request=GetFeature&srsname=EPSG:4326`;
        const res: Response = await fetch(url);
        let geoJson: any = await res.json();
        let geoJsonNewProp: any = this.substituteRelevantProperties(geoJson, layer);
        let geoJsonAddProp = this.createFeatureAdditionalProperties(geoJsonNewProp, layer);
        return geoJsonAddProp;
    }

    public async createGeoJsonFromEntity(entity: Cesium.Entity): Promise<any> {
        let geojson: any = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: []
            },
            properties: {}
        }

        if (entity.point && entity.position) {
            geojson.geometry.type = 'Point';
            let cartographic: Cesium.Cartographic | null = this.createGeojsonPointCoordinates(entity)
            if (cartographic) geojson.geometry.coordinates = [Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude)];
        }

        if (entity.polyline && entity.polyline.positions) {
            geojson.geometry.type = 'LineString';
            geojson.geometry.coordinates = this.createGeojsonPolylineCoordinates(entity);
        }

        if (entity.polygon && entity.polygon.hierarchy) {
            geojson.geometry.type = 'Polygon';
            geojson.geometry.coordinates = this.createGeojsonPolygonCoordinates(entity)
        }

        return geojson;
    }

    private createGeojsonFeatureFromPoi(poi: PointOfInterest): any {
        return {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [Cesium.Math.toDegrees(poi.position.longitude), Cesium.Math.toDegrees(poi.position.latitude)]
            },
            properties: {}
        }
    }

    public createGeojsonFeatureCollectionFromPois(pois: PointOfInterest[]): any {
        let geoJson: any = {
            type: "FeatureCollection",
            features: []
        }

        let features: any = pois.map((poi: PointOfInterest) => this.createGeojsonFeatureFromPoi(poi));
        geoJson.features = features;
        return geoJson;
    }

    private createGeojsonPointCoordinates(entity: Cesium.Entity): Cesium.Cartographic | null {
        if (!entity.position) return null;
        let pos: Cesium.Cartesian3 | undefined = entity.position.getValue(Cesium.JulianDate.now());
        if (!pos) return null
        let cartographic: Cesium.Cartographic = Cesium.Cartographic.fromCartesian(pos);
        return cartographic;
    }

    private createGeojsonPolylineCoordinates(entity: Cesium.Entity): number[][] {
        if (!entity.polyline || !entity.polyline.positions) return [];
        let pos: Cesium.Cartesian3[] | undefined = entity.polyline.positions.getValue(Cesium.JulianDate.now());
        let array: number[][] = [];
        if (pos) {
            pos.forEach((p: Cesium.Cartesian3) => {
                let arr: number[];
                let cartographic: Cesium.Cartographic = Cesium.Cartographic.fromCartesian(p);
                arr = [Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude)];
                array.push(arr);
            });
        }
        return array;
    }

    private createGeojsonPolygonCoordinates(entity: Cesium.Entity): number[][][] {
        if (!entity.polygon || !entity.polygon.hierarchy) return [];
        let pos: Cesium.PolygonHierarchy | undefined = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now());
        let array = [];

        if (pos) {
            let positionsArray: number[][] = []
            pos.positions.forEach((p: Cesium.Cartesian3) => {
                let arr: number[];
                let cartographic: Cesium.Cartographic = Cesium.Cartographic.fromCartesian(p);
                arr = [Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude)];
                positionsArray.push(arr);
            });
            array.push(positionsArray);
            pos.holes.forEach((h: Cesium.PolygonHierarchy) => {
                let holeArray: number[][] = [];
                h.positions.forEach((p: Cesium.Cartesian3) => {
                    let array: number[];
                    let cartographic: Cesium.Cartographic = Cesium.Cartographic.fromCartesian(p);
                    array = [Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude)];
                    holeArray.push(array);
                });
                array.push(holeArray);
            });
        }

        return array;
    }

    private createFeatureAdditionalProperties(geoJson: any, layer: Layer): any {
        geoJson.features = geoJson.features.map((f: Feature, i: number) => {
            f.properties.name = layer.name + ' ' + i;
            f.properties.layer = layer;

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

            return f;
        });
        return geoJson;
    }

    private substituteRelevantProperties(geoJson: any, layer: Layer) {
        geoJson.features.forEach((feature: any) => {
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

        return geoJson;
    }

    public styleFeature(dataSource: Cesium.DataSource, style: LayerStyle): void {
        dataSource.entities.values.forEach((entity: Cesium.Entity) => {
            if (entity.billboard) {
                switch (dataSource.name) {
                    case 'custom-path':
                        this.styleCustomPath(entity);
                        break;
                    case 'selected-feature':
                        this.styleSelectedFeature(entity);
                        break;
                    default:
                        this.stylePointFeature(entity, style);
                        break;
                }
            }
            if (entity.polyline) this.stylePolylineFeature(entity, style);
            if (entity.polygon) this.stylePolygonFeature(entity, style);
        });
    }

    private stylePointFeature(entity: Cesium.Entity, style: LayerStyle): Cesium.Entity {
        entity.billboard = undefined;
        entity.point = new Cesium.PointGraphics({
            pixelSize: 8,
            color: Cesium.Color.fromCssColorString(style.color).withAlpha(style.opacity),
            outlineColor: Cesium.Color.fromCssColorString(style.color),
            outlineWidth: 1
        });
        return entity;
    }

    private styleCustomPath(entity: Cesium.Entity): Cesium.Entity {
        entity.billboard = undefined;
        entity.point = new Cesium.PointGraphics({
            pixelSize: 12,
            color: Cesium.Color.TRANSPARENT,
            outlineColor: Cesium.Color.BLUE,
            outlineWidth: 2
        });
        return entity;
    }

    private styleSelectedFeature(entity: Cesium.Entity): Cesium.Entity {
        entity.billboard = undefined;
        entity.point = new Cesium.PointGraphics({
            pixelSize: 16,
            color: Cesium.Color.TRANSPARENT,
            outlineColor: Cesium.Color.GREEN,
            outlineWidth: 2
        });
        return entity;
    }

    private stylePolylineFeature(entity: Cesium.Entity, style: LayerStyle): Cesium.Entity {
        if (!entity.polyline) return entity;
        entity.polyline.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(style.color));
        entity.polyline.width = new Cesium.ConstantProperty(2.0);
        return entity;
    }

    private stylePolygonFeature(entity: Cesium.Entity, style: LayerStyle): Cesium.Entity {
        if (!entity.polygon) return entity;
        entity.polygon.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(style.color).withAlpha(style.opacity));
        entity.polygon.outlineColor = new Cesium.ConstantProperty(Cesium.Color.fromCssColorString(style.color));
        return entity;
    }

    public openGoogleMaps(position: Cesium.Cartographic): void {
        const url: string = `https://www.google.it/maps/dir/?api=1&destination=${Cesium.Math.toDegrees(position.latitude)},${Cesium.Math.toDegrees(position.longitude)}`;
        window.open(url, '_blank');
    }
}