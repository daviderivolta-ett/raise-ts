import * as Cesium from 'cesium';

import { Layer, LayerProperty, LayerStyle } from '../models/layer.model';
import { Feature, FeatureGeometryType } from '../models/feature.model';

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
            if (entity.billboard) this.stylePointFeature(entity, style);
            if (entity.polyline) this.stylePolylineFeature(entity, style);
            if (entity.polygon) this.stylePolygonFeature(entity, style);
        });
    }

    private stylePointFeature(entity: Cesium.Entity, style: LayerStyle): Cesium.Entity {
        entity.billboard = undefined;
        entity.point = new Cesium.PointGraphics({
            pixelSize: 8,
            color: Cesium.Color.fromCssColorString(style.color).withAlpha(0.5),
            outlineColor: Cesium.Color.fromCssColorString(style.color),
            outlineWidth: 1
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