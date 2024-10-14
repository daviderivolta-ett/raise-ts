import { Layer, PropertyType } from './layer.model';
import { LngLat } from 'maplibre-gl';

export class PointOfInterest {
    uuid: string;
    name: string;
    position: LngLat;
    type: PoiType;
    layer: Layer;
    layerName: string;
    props: PoiProperty[];

    constructor(
        uuid: string,
        name: string,
        position: LngLat,
        type: PoiType,
        layer: Layer,
        layerName: string,
        props: PoiProperty[]
    ) {
        this.uuid = uuid;
        this.name = name;
        this.position = position;
        this.type = type;
        this.layer = layer;
        this.layerName = layerName;
        this.props = props;
    }

    static createEmpty(): PointOfInterest {
        return new PointOfInterest(
            '',
            '',
            new LngLat(0.0, 0.0),
            PoiType.Point,
            Layer.createEmpty(),
            '',
            []
        );
    }

    static createCustomPoi(lngLat: LngLat): PointOfInterest {
        return new PointOfInterest(
            generateId(20),
            'Punto personalizzato',
            lngLat,
            PoiType.Point,
            Layer.createEmpty(),
            '',
            []
        );
    }
}

export class PoiProperty {
    propertyName: string;
    displayName: string;
    type: PropertyType;
    value: string;

    constructor(propertyName: string, displayName: string, type: PropertyType, value: string) {
        this.propertyName = propertyName;
        this.displayName = displayName;
        this.type = type;
        this.value = value;
    }

    static createEmpty(): PoiProperty {
        return new PoiProperty('', '', PropertyType.String, '');
    }
}

export enum PoiType {
    Point = 'point',
    Polyline = 'polyline',
    Polygon = 'polygon'
}

function generateId(length: number): string {
    let id: string = '';
    const letters: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let idLength: number = 0;
    while (idLength < length) {
        const pickedLetter: string = letters[Math.floor(Math.random() * letters.length)];
        id += pickedLetter;
        idLength++;
    }
    return id;
}