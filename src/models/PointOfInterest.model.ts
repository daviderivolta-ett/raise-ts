import * as Cesium from 'cesium';

import { Layer, PropertyType } from './Layer.model';

export class PointOfInterest {
    uuid: string;
    name: string;
    position: Cesium.Cartographic;
    type: PoiType;
    layer: Layer;
    props: PoiProperty[];

    constructor(
        uuid: string,
        name: string,
        position: Cesium.Cartographic,
        type: PoiType,
        layer: Layer,
        props: PoiProperty[]
    ) {
        this.uuid = uuid;
        this.name = name;
        this.position = position;
        this.type = type;
        this.layer = layer;
        this.props = props;
    }

    static createEmpty(): PointOfInterest {
        return new PointOfInterest(
            '',
            '',
            Cesium.Cartographic.ZERO,
            PoiType.Point,
            Layer.createEmpty(),
            []
        );
    }
}

export class PoiProperty {
    displayName: string;
    type: PropertyType;
    value: string;

    constructor(displayName: string, type: PropertyType, value: string) {
        this.displayName = displayName;
        this.type = type;
        this.value = value;
    }

    static createEmpty(): PoiProperty {
        return new PoiProperty('', PropertyType.String, '');
    }
}

export enum PoiType {
    Point = 'point',
    Polyline = 'polyline',
    Polygon = 'polygon'
}