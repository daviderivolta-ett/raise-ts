export interface Data {
    categories: LayerCategory[]
}

export interface LayerCategory {
    name: string;
    groups: LayerGroup[] | string[];
}

export interface LayerGroup {
    name: string;
    layers: Layer[];
}

export class LayerStyle {
    color: string;
    opacity: number;

    constructor(
        color: string,
        opacity: number
    ) {
        this.color = color;
        this.opacity = opacity;
    }

    static createEmpty(): LayerStyle {
        return new LayerStyle('', 0);
    }
}

export class LayerProperty {
    propertyName: string;
    displayName: string;
    type: PropertyType;

    constructor(propertyName: string, displayName: string, type: PropertyType) {
        this.propertyName = propertyName;
        this.displayName = displayName;
        this.type = type;
    }

    static createEmpty(): LayerProperty {
        return new LayerProperty('', '', PropertyType.String);
    }
}

export enum PropertyType {
    String = 'string',
    Image = 'image',
    Number = 'number'
}

export class Layer {
    name: string;
    layer: string;
    url: string;
    style: LayerStyle;
    tags: string[];
    relevantProperties: LayerProperty[];

    constructor(
        name: string,
        layer: string,
        url: string,
        style: LayerStyle,
        tags: string[],
        relevantProperties: LayerProperty[]
    ) {
        this.name = name;
        this.layer = layer;
        this.url = url;
        this.style = style;
        this.tags = tags;
        this.relevantProperties = relevantProperties;
    }

    static createEmpty(): Layer {
        return new Layer(
            '',
            '',
            '',
            LayerStyle.createEmpty(),
            [],
            [LayerProperty.createEmpty()]
        )
    }

}

export interface SavedLayers {
    active: Layer[],
    bench: Layer[]
}