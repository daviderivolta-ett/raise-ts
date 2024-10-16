import * as Cesium from 'cesium';

import { MapTheme, Theme } from '../models/theme.model';
import { EventObservable } from '../observables/event.observable';

export class ThemeService {
    private static _instance: ThemeService;
    private MAP_THEMES_URL: string = './json/themes.json';
    private _currentTheme: Theme = Theme.Dark;
    private _isPhysicalMap: boolean = false;
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
        EventObservable.instance.publish('change-theme', { isPhysicalMap: this.isPhysicalMap, theme: this.chooseMapTheme(this.currentTheme) });
    }

    public get isPhysicalMap(): boolean {
        return this._isPhysicalMap;
    }

    public set isPhysicalMap(isPhysicalMap: boolean) {
        this._isPhysicalMap = isPhysicalMap;
        EventObservable.instance.publish('toggle-physical-map', { isPhysicalMap: this.isPhysicalMap, currentTheme: this.chooseMapTheme(this.currentTheme) });
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

    public togglePhysicalMap(): void {
        this.isPhysicalMap === true ? this.isPhysicalMap = false : this.isPhysicalMap = true;
    }

    public chooseMapTheme(theme: Theme): MapTheme {       
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

    private setDarkTheme(): void {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
    }

    private setLightTheme(): void {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    }

    public getPreferColorScheme(): void {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (prefersDarkScheme) {
            this.currentTheme = Theme.Dark;
        } else {
            this.currentTheme = Theme.Light;
        }
    }
}