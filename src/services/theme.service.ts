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
        document.documentElement.style.setProperty('--primary', 'rgb(0, 107, 88)');
        document.documentElement.style.setProperty('--on-primary', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--primary-container', 'rgb(243, 255, 249)');
        document.documentElement.style.setProperty('--on-primary-container', 'rgb(0, 32, 25)');

        document.documentElement.style.setProperty('--secondary', 'rgb(71, 100, 91)');
        document.documentElement.style.setProperty('--on-secondary', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--secondary-container', 'rgb(243, 255, 249)');
        document.documentElement.style.setProperty('--on-secondary-container', 'rgb(3, 32, 25)');

        document.documentElement.style.setProperty('--tertiary', 'rgb(59, 99, 122)');
        document.documentElement.style.setProperty('--on-tertiary', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--tertiary-container', 'rgb(251, 252, 255)');
        document.documentElement.style.setProperty('--on-tertiary-container', 'rgb(0, 30, 45)');

        document.documentElement.style.setProperty('--error', 'rgb(184, 31, 33)');
        document.documentElement.style.setProperty('--on-error', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--error-container', 'rgb(255, 218, 214)');
        document.documentElement.style.setProperty('--on-error-container', 'rgb(65, 0, 3)');

        document.documentElement.style.setProperty('--surface-dim', 'rgb(204, 218, 249)');
        document.documentElement.style.setProperty('--surface', 'rgb(249, 249, 255)');
        document.documentElement.style.setProperty('--surface-bright', 'rgb(249, 249, 255)');

        document.documentElement.style.setProperty('--surface-container-lowest', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--surface-container-low', 'rgb(240, 243, 255)');
        document.documentElement.style.setProperty('--surface-container', 'rgb(232, 238, 255)');
        document.documentElement.style.setProperty('--surface-container-high', 'rgb(223, 232, 255)');
        document.documentElement.style.setProperty('--surface-container-highest', 'rgb(214, 227, 255)');

        document.documentElement.style.setProperty('--on-surface', 'rgb(13, 28, 50)');
        document.documentElement.style.setProperty('--on-surface-variant', 'rgb(42, 72, 112)');
        document.documentElement.style.setProperty('--outline', 'rgb(92, 120, 163)');
        document.documentElement.style.setProperty('--outline-variant', 'rgb(171, 200, 247)');

        document.documentElement.style.setProperty('--inverse-surface', 'rgb(35, 49, 72)');
        document.documentElement.style.setProperty('--inverse-on-surface', 'rgb(236, 240, 255)');
        document.documentElement.style.setProperty('--inverse-primary', 'rgb(55, 222, 187)');
    }

    private setDarkTheme(): void {
        document.documentElement.style.setProperty('--primary', 'rgb(55, 222, 187)');
        document.documentElement.style.setProperty('--on-primary', 'rgb(0, 56, 45)');
        document.documentElement.style.setProperty('--primary-container', 'rgb(0, 81, 66)');
        document.documentElement.style.setProperty('--on-primary-container', 'rgb(184, 255, 233)');

        document.documentElement.style.setProperty('--secondary', 'rgb(174, 205, 194)');
        document.documentElement.style.setProperty('--on-secondary', 'rgb(25, 53, 46)');
        document.documentElement.style.setProperty('--secondary-container', 'rgb(48, 76, 68)');
        document.documentElement.style.setProperty('--on-secondary-container', 'rgb(202, 233, 222)');

        document.documentElement.style.setProperty('--tertiary', 'rgb(163, 204, 231)');
        document.documentElement.style.setProperty('--on-tertiary', 'rgb(1, 52, 74)');
        document.documentElement.style.setProperty('--tertiary-container', 'rgb(33, 75, 98)');
        document.documentElement.style.setProperty('--on-tertiary-container', 'rgb(197, 231, 255)');

        document.documentElement.style.setProperty('--error', 'rgb(255, 180, 171)');
        document.documentElement.style.setProperty('--on-error', 'rgb(105, 0, 5)');
        document.documentElement.style.setProperty('--error-container', 'rgb(147, 0, 10)');
        document.documentElement.style.setProperty('--on-error-container', 'rgb(255, 218, 214)');

        document.documentElement.style.setProperty('--surface-dim', 'rgb(5, 19, 41)');
        document.documentElement.style.setProperty('--surface', 'rgb(5, 19, 41)');
        document.documentElement.style.setProperty('--surface-bright', 'rgb(45, 57, 81)');

        document.documentElement.style.setProperty('--surface-container-lowest', 'rgb(1, 14, 36)');
        document.documentElement.style.setProperty('--surface-container-low', 'rgb(14, 27, 50)');
        document.documentElement.style.setProperty('--surface-container', 'rgb(18, 32, 54)');
        document.documentElement.style.setProperty('--surface-container-high', 'rgb(29, 42, 65)');
        document.documentElement.style.setProperty('--surface-container-highest', 'rgb(40, 53, 77)');

        document.documentElement.style.setProperty('--on-surface', 'rgb(214, 227, 255)');
        document.documentElement.style.setProperty('--on-surface-variant', 'rgb(171, 200, 247)');
        document.documentElement.style.setProperty('--outline', 'rgb(118, 146, 191)');
        document.documentElement.style.setProperty('--outline-variant', 'rgb(42, 72, 112)');

        document.documentElement.style.setProperty('--inverse-surface', 'rgb(214, 227, 255)');
        document.documentElement.style.setProperty('--inverse-on-surface', 'rgb(35, 49, 72)');
        document.documentElement.style.setProperty('--inverse-primary', 'rgb(0, 107, 88)');
    }
}