import * as Cesium from 'cesium';

import { MapTheme } from '../models/MapTheme.model';
import { Layer, LayerProperty, LayerStyle } from '../models/Layer.model';
import { Feature, FeatureGeometryType } from '../models/Feature.model';
import { EventObservable } from '../observables/event.observable';
import { SnackbarService } from './snackbar.service';
import { SnackbarType } from '../models/SnackbarType.model';

export class MapService {
    private static _instance: MapService;
    private _viewer!: Cesium.Viewer;
    private MAP_THEMES_URL: string = './json/themes.json';
    public mapThemes: MapTheme[] = [];
    public currentTheme: number = 0;
    private _activeLayers: Layer[] = [];
    private _benchLayers: Layer[] = [];

    constructor() {
        if (MapService._instance) return MapService._instance;
        MapService._instance = this;
    }

    static get instance(): MapService {
        if (!MapService._instance) MapService._instance = new MapService();
        return MapService._instance;
    }

    public get viewer(): Cesium.Viewer {
        return this._viewer;
    }

    public set viewer(viewer: Cesium.Viewer) {
        this._viewer = viewer;
    }

    public get activeLayers(): Layer[] {
        return this._activeLayers;
    }

    public set activeLayers(activeLayers: Layer[]) {
        this._activeLayers = activeLayers;
        EventObservable.instance.publish('active-layers-updated', this.activeLayers);
    }

    public get benchLayers(): Layer[] {
        return this._benchLayers;
    }

    public set benchLayers(benchLayers: Layer[]) {
        this._benchLayers = benchLayers;
        EventObservable.instance.publish('bench-layers-updated', this.benchLayers);
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
        )
    }

    public addBaseLayers(themes: MapTheme[]): void {
        themes.forEach((theme: MapTheme) => {
            this.viewer.imageryLayers.addImageryProvider(this.createImageryProvider(theme));
        });
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

    public setCameraToPosition(position: GeolocationPosition | Cesium.Cartographic | null): void {
        let currentCameraPosition: Cesium.Cartographic = this.viewer.camera.positionCartographic;
        currentCameraPosition.height > 2000000 ? currentCameraPosition.height = 2000 : currentCameraPosition.height;
        let initialPosition: Cesium.Cartesian3 = Cesium.Cartesian3.fromDegrees(8.934080815653985, 44.40753207658791, 2000);

        if (position && position instanceof GeolocationPosition) {          
            initialPosition = Cesium.Cartesian3.fromDegrees(position.coords.longitude, position.coords.latitude, currentCameraPosition.height);
        }
        
        if (position && position instanceof Cesium.Cartographic) {                  
            initialPosition = Cesium.Cartesian3.fromRadians(position.longitude, position.latitude, currentCameraPosition.height);
        }


        this.viewer.camera.flyTo({
            destination: initialPosition,
            orientation: {
                heading: Cesium.Math.toRadians(0.0),
                pitch: Cesium.Math.toRadians(-90.0),
                roll: 0
            },
            duration: 0.5
        })
    }

    public changeTheme(index: number): void {
        let choosenTheme: Cesium.ImageryLayer = this.viewer.imageryLayers.get(index);
        this.viewer.imageryLayers.raiseToTop(choosenTheme);
    }

    public checkUserPin(position: GeolocationPosition): void {
        const userPin: Cesium.Entity | undefined = this.viewer.entities.getById('user-pin');
        userPin ? this.updateUserPin(userPin, position) : this.createUserPin(position);
    }

    public createUserPin(position: GeolocationPosition): void {
        this.viewer.entities.add({
            name: 'user-pin',
            id: 'user-pin',
            position: Cesium.Cartesian3.fromDegrees(position.coords.longitude, position.coords.latitude, 0.0),
            point: {
                pixelSize: 8,
                color: Cesium.Color.BLUE.withAlpha(0.5),
                outlineColor: Cesium.Color.BLUE,
                outlineWidth: 1
            }
        });
    }

    public updateUserPin(pin: Cesium.Entity, position: GeolocationPosition): void {
        const getPosition = () => {
            return Cesium.Cartesian3.fromDegrees(position.coords.longitude, position.coords.latitude, 0.0);
        };
        pin.position = new Cesium.ConstantPositionProperty(getPosition());
    }

    public changeMapMode(): void {
        let currentMode: Cesium.SceneMode = this.viewer.scene.mode;
        currentMode === Cesium.SceneMode.SCENE3D ? this.viewer.scene.morphTo2D(1) : this.viewer.scene.morphTo3D(1);
    }

    public async addLayerToMap(layer: Layer): Promise<void> {
        try {
            const geoJson: any = this.createGeoJson(layer);
            const dataSource: Cesium.DataSource = await Cesium.GeoJsonDataSource.load(geoJson);
            dataSource.name = layer.layer;
            this.viewer.dataSources.add(dataSource);
            this.styleFeature(dataSource, layer.style);
        } catch (error) {
            throw error;
        }
    }

    public isLayerOnMap(layer: Layer): boolean {
        const foundDataSources: Cesium.DataSource[] = this.viewer.dataSources.getByName(layer.layer);
        return foundDataSources.length > 0 ? true : false;
    }

    public addLayerToActiveLayers(layer: Layer): void {
        this._activeLayers.unshift(layer);
        this.activeLayers = [...this._activeLayers];

        const isBenched: boolean = this._benchLayers.some((l: Layer) => l.layer === layer.layer);
        if (isBenched) {
            this._benchLayers = this._benchLayers.filter((l: Layer) => l.layer !== layer.layer);
            this.benchLayers = this._benchLayers;
        }
    }

    public removeLayerFromMap(layer: Layer): void {
        const foundDataSources: Cesium.DataSource[] = this.viewer.dataSources.getByName(layer.layer);
        foundDataSources.forEach((dataSource: Cesium.DataSource) => this.viewer.dataSources.remove(dataSource));
    }

    public removeLayerFromActiveLayers(layer: Layer): void {
        this._activeLayers = this._activeLayers.filter((l: Layer) => l.layer !== layer.layer);
        this.activeLayers = [...this._activeLayers];
    }

    public removeLayer(layer: Layer): void {
        const foundDataSources: Cesium.DataSource[] = this.viewer.dataSources.getByName(layer.layer);
        foundDataSources.forEach((dataSource: Cesium.DataSource) => this.viewer.dataSources.remove(dataSource));

        this._activeLayers = this._activeLayers.filter((l: Layer) => l.layer !== layer.layer);
        this.activeLayers = [...this._activeLayers];
    }

    public addLayerToBench(layer: Layer): void {
        this._benchLayers.unshift(layer);
        this.benchLayers = [...this._benchLayers];
    }

    public removeLayerFromBench(layer: Layer): void {
        this._benchLayers = this._benchLayers.filter((l: Layer) => l.layer !== layer.layer);
        this.benchLayers = this._benchLayers;
    }

    public async addLayer(layer: Layer): Promise<void> {
        if (!this.isLayerOnMap(layer)) {
            try {
                SnackbarService.instance.createSnackbar(SnackbarType.Loader, layer.layer, 'Caricamento...');
                await this.addLayerToMap(layer);
                this.addLayerToActiveLayers(layer);
                SnackbarService.instance.removeSnackbar(layer.layer);
            } catch (error) {
                SnackbarService.instance.removeSnackbar(layer.layer);
                SnackbarService.instance.createSnackbar(SnackbarType.Error, '', 'Errore nel caricamento del layer');
            }
        } else {
            SnackbarService.instance.createSnackbar(SnackbarType.Temporary, '', 'Layer già presente', 3);
        }
    }

    public benchLayer(layer: Layer): void {
        this.removeLayerFromMap(layer);
        this.removeLayerFromActiveLayers(layer);
        this.addLayerToBench(layer);
    }

    public async unbenchLayer(layer: Layer): Promise<void> {
        try {
            SnackbarService.instance.createSnackbar(SnackbarType.Loader, layer.layer, 'Caricamento...');
            await this.addLayerToMap(layer);
            this.removeLayerFromBench(layer);
            this.addLayerToActiveLayers(layer);
            SnackbarService.instance.removeSnackbar(layer.layer);
        } catch (error) {
            SnackbarService.instance.removeSnackbar(layer.layer);
            SnackbarService.instance.createSnackbar(SnackbarType.Error, '', 'Errore nel caricamento del layer');
        }
    }

    public async createGeoJson(layer: Layer): Promise<any> {
        const url = `${layer.url}?service=WFS&typeName=${layer.layer}&outputFormat=application/json&request=GetFeature&srsname=EPSG:4326`;
        const res: Response = await fetch(url);
        let geoJson: any = await res.json();
        let geoJsonNewProp: any = this.substituteRelevantProperties(geoJson, layer);
        let geoJsonAddProp = this.createFeatureAdditionalProperties(geoJsonNewProp, layer);
        return geoJsonAddProp;
    }

    private createFeatureAdditionalProperties(geoJson: any, layer: Layer): any {
        geoJson.features = geoJson.features.map((f: Feature, i: number) => {
            f.properties.name = layer.name + ' ' + i;
            f.properties.layer = layer;

            switch (f.geometry.type) {
                case FeatureGeometryType.Point:
                    f.properties.uuid = layer.layer + f.geometry.coordinates[1] + f.geometry.coordinates[0];
                    break;

                case FeatureGeometryType.LineString || FeatureGeometryType.Polygon || FeatureGeometryType.MultiPoint:
                    f.properties.uuid = layer.layer + (f.geometry.coordinates as number[][])[0][1] + (f.geometry.coordinates as number[][])[0][0];
                    break;

                default:
                    f.properties.uuid = layer.layer + (f.geometry.coordinates as number[][][])[0][0][1] + (f.geometry.coordinates as number[][][])[0][0][0];
                    break;
            }

            return f;
        });
        return geoJson;
    }

    private substituteRelevantProperties(geoJson: any, layer: Layer) {
        geoJson.features.forEach((feature: any) => {
            const newProperties: any = {};

            for (const key in feature.properties) {
                const relevantProperty = layer.relevantProperties.find((prop: LayerProperty) => prop.propertyName === key);
                if (relevantProperty) {
                    const newPropertyValue = {
                        displayName: relevantProperty.displayName,
                        type: relevantProperty.type,
                        value: feature.properties[key]
                    };
                    newProperties[key] = newPropertyValue;
                }
            }
            feature.properties = newProperties;
        });

        return geoJson;
    }

    private styleFeature(dataSource: Cesium.DataSource, style: LayerStyle): void {
        dataSource.entities.values.forEach((entity: Cesium.Entity) => {
            if (entity.billboard) this.stylePointFeature(entity, style);
            if (entity.polyline) this.stylePolylineFeature(entity, style);
            if (entity.polygon) this.stylePolygonFeature(entity, style);
        });
    }

    private stylePointFeature(entity: Cesium.Entity, style: LayerStyle): Cesium.Entity {
        entity.billboard = undefined;
        entity.point = new Cesium.PointGraphics({
            pixelSize: 8,
            color: Cesium.Color.fromCssColorString(style.color).withAlpha(0.5),
            outlineColor: Cesium.Color.fromCssColorString(style.color),
            outlineWidth: 1
        });
        return entity;
    }

    private stylePolylineFeature(entity: Cesium.Entity, style: LayerStyle): Cesium.Entity {
        if (!entity.polyline) return entity;
        entity.polyline.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(style.color));
        entity.polyline.width = new Cesium.ConstantProperty(2.0);
        return entity;
    }

    private stylePolygonFeature(entity: Cesium.Entity, style: LayerStyle): Cesium.Entity {
        if (!entity.polygon) return entity;
        entity.polygon.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(style.color).withAlpha(style.opacity));
        entity.polygon.outlineColor = new Cesium.ConstantProperty(Cesium.Color.fromCssColorString(style.color));
        return entity;
    }

    public openGoogleMaps(position: Cesium.Cartographic): void {      
        const url: string = `https://www.google.it/maps/dir/?api=1&destination=${Cesium.Math.toDegrees(position.latitude)},${Cesium.Math.toDegrees(position.longitude)}`;
        window.open(url, '_blank');
    }
}