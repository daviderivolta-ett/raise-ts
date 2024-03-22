export enum FeatureGeometryType {
    Point = 'Point',
    LineString = 'LineString',
    Polygon = 'Polygon',
    MultiPoint = 'MultiPoint',
    MultiLineString = 'MultiLineString',
    MultiPolygon = 'MultiPolygon'
}

export class FeatureGeometry {
    type: FeatureGeometryType;
    coordinates: number[] | number[][] | number[][][]

    constructor(type: FeatureGeometryType, coordinates: number[] | number[][] | number[][][]) {
        this.type = type;
        this.coordinates = coordinates;
    }

    static createEmpty(): FeatureGeometry {
        return new FeatureGeometry(FeatureGeometryType.Point, []);
    }
}

export class Feature {
    type: string;
    geometry: FeatureGeometry;
    properties: { [key: string]: any };
    id?: string;
    geometry_name?: string;

    constructor(
        type: string,
        geometry: FeatureGeometry,
        properties: { [key: string]: any },
        id: string,
        geometry_name: string
    ) {
        this.type = type;
        this.geometry = geometry;
        this.properties = properties;
        this.id = id;
        this.geometry_name = geometry_name;
    }

    static createEmpty(): Feature {
        return new Feature('', FeatureGeometry.createEmpty(), { prop: '' }, '', '');
    }
}