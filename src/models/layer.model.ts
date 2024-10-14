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
        return new LayerStyle('#1152F7', 1);
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

export class LayerComponent {
    tag: string;
    props: Record<string, any>;

    constructor(tag: string, props: {}) {
        this.tag = tag;
        this.props = props;
    }
}

export class Layer {
    name: string;
    id: string;
    url: string;
    style: LayerStyle;
    tags: string[];
    relevantProperties: LayerProperty[];
    hasAction: boolean;
    components: LayerComponent[];

    constructor(
        name: string,
        id: string,
        url: string,
        style: LayerStyle,
        tags: string[],
        relevantProperties: LayerProperty[],
        hasAction: boolean,
        components: LayerComponent[]
    ) {
        this.name = name;
        this.id = id;
        this.url = url;
        this.style = style;
        this.tags = tags;
        this.relevantProperties = relevantProperties;
        this.hasAction = hasAction;
        this.components = components;
    }

    static createEmpty(): Layer {
        return new Layer(
            '',
            '',
            '',
            LayerStyle.createEmpty(),
            [],
            [LayerProperty.createEmpty()],
            false,
            []
        )
    }

}

export interface SavedLayers {
    active: Layer[],
    bench: Layer[]
}