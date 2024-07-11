export class MapTheme {
    url: string;
    layer: string;
    credit: string;

    constructor(url: string, layer: string, credit: string) {
        this.url = url;
        this.layer = layer;
        this.credit = credit;
    }
}

export class MapColor {
    id: Theme;
    url: string;

    constructor(id: Theme, url: string) {
        this.id = id;
        this.url = url;
    }
}

export enum Theme {
    Light = 'light',
    Dark = 'dark'
}

export const MAP_COLORS_URLs: Record<Theme, string> = {
    [Theme.Light]: './settings/map-light.json',
    [Theme.Dark]: './settings/map-dark.json'
};