import * as Cesium from 'cesium';

import { MapTheme, Theme } from '../models/theme.model';
import { EventObservable } from '../observables/event.observable';

export class ThemeService {
    private static _instance: ThemeService;
    private MAP_THEMES_URL: string = './json/themes.json';
    private _currentTheme: Theme = Theme.Dark;
    public mapThemes: MapTheme[] = [];

    constructor() {
        if (ThemeService._instance) return ThemeService._instance;
        ThemeService._instance = this;
    }

    static get instance(): ThemeService {
        if (!ThemeService._instance) ThemeService._instance = new ThemeService();
        return ThemeService._instance;
    }

    public get currentTheme(): Theme {
        return this._currentTheme;
    }

    public set currentTheme(currentTheme: Theme) {
        this._currentTheme = currentTheme;
        this.changeColors(this.currentTheme);
        EventObservable.instance.publish('change-theme', this.chooseMapTheme(this.currentTheme));
    }

    public async getMapThemes(): Promise<MapTheme[]> {
        if (this.mapThemes.length !== 0) {
            return this.mapThemes;
        } else {
            let mapThemes: MapTheme[] = await this.fetchMapThemes(this.MAP_THEMES_URL);
            this.mapThemes = mapThemes;
            return mapThemes;
        }
    }

    public async fetchMapThemes(url: string): Promise<MapTheme[]> {
        let mapThemes: MapTheme[] = [];
        try {
            mapThemes = await fetch(url).then(res => res.json());
            mapThemes = mapThemes.map((theme: any) => this.parseMapTheme(theme));
        } catch (error) {
            console.error(error);
        }
        return mapThemes;
    }

    private parseMapTheme(theme: any): MapTheme {
        return new MapTheme(
            theme.url,
            theme.layer,
            theme.credit
        );
    }

    public createImageryProvider(theme: MapTheme): Cesium.WebMapTileServiceImageryProvider {
        return new Cesium.WebMapTileServiceImageryProvider(
            {
                url: theme.url,
                layer: theme.layer,
                credit: new Cesium.Credit(theme.credit),
                tileMatrixSetID: 'default',
                style: 'default',
                format: 'image/jpeg',
                maximumLevel: 19,
            }
        );
    }

    public toggleTheme(): void {
        this.currentTheme === Theme.Light ? this.currentTheme = Theme.Dark : this.currentTheme = Theme.Light;
    }

    private chooseMapTheme(theme: Theme): MapTheme {
        const mapTheme: MapTheme | undefined = theme === Theme.Dark ?
            this.mapThemes.find((theme: MapTheme) => theme.layer === 'carto-dark') :
            this.mapThemes.find((theme: MapTheme) => theme.layer === 'carto-light');

        if (mapTheme !== undefined) {
            return mapTheme;
        } else {
            throw new Error("Impossibile trovare il tema della mappa desiderato.");
        }
    }

    private changeColors(theme: Theme): void {
        switch (theme) {
            case Theme.Dark:
                this.setDarkTheme();
                break;

            default:
                this.setLightTheme();
                break;
        }
    }
    
    private setLightTheme(): void {
        document.documentElement.style.setProperty('--f-default', '0, 29, 53');
        document.documentElement.style.setProperty('--f-emphasis', '0, 0, 0');
        
        document.documentElement.style.setProperty('--bg-inset', '246, 248, 252');
        document.documentElement.style.setProperty('--bg-default', '234, 241, 251');
        document.documentElement.style.setProperty('--bg-subtle', '211, 227, 253');
    }
    
    private setDarkTheme(): void {
        document.documentElement.style.setProperty('--f-default', '168, 178, 209');
        document.documentElement.style.setProperty('--f-emphasis', '233, 235, 244');

        document.documentElement.style.setProperty('--bg-inset', '10, 25, 47');
        document.documentElement.style.setProperty('--bg-default', '17, 34, 64');
        document.documentElement.style.setProperty('--bg-subtle', '32, 52, 81');
    }
}