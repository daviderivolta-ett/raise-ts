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

export enum Theme {
    Light = 'light',
    Dark = 'dark'
}