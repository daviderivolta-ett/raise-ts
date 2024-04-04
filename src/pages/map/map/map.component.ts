import * as Cesium from 'cesium';

import { PoiType, PointOfInterest } from '../../../models/poi.model';
import { Path } from '../../../models/path.model';
import { MapTheme } from '../../../models/theme.model';
import { Layer, LayerStyle } from '../../../models/layer.model';
import { SnackbarType } from '../../../models/snackbar-type.model';

import { TabsToggleObservable } from '../../../observables/tabs-toggle.observable';
import { BenchToggleObservable } from '../../../observables/bench-toggle.observable';
import { EventObservable } from '../../../observables/event.observable';
import { ThemeService } from '../../../services/theme.service';
import { StorageService } from '../../../services/storage.service';
import { PositionService } from '../../../services/position.service';
import { MapService } from '../../../services/map.service';
import { PoiService } from '../../../services/poi.service';
import { SnackbarService } from '../../../services/snackbar.service';

import style from './map.component.scss?raw';
import cesiumStyle from 'cesium/Build/Cesium/Widgets/widgets.css?raw';

export class MapComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    public container: HTMLElement = document.createElement('div');
    public viewer!: Cesium.Viewer;
    public imageryLayers: Record<string, Cesium.ImageryLayer> = {};

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        let sheet: CSSStyleSheet = new CSSStyleSheet();
        let cesiumSheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replace(style);
        cesiumSheet.replace(cesiumStyle);
        this.shadowRoot.adoptedStyleSheets = [cesiumSheet, sheet];
    }

    public connectedCallback(): void {
        this.render();
        this.addBaseLayers(ThemeService.instance.mapThemes);
        this.setup();
        StorageService.instance.activeLayers.forEach((layer: Layer) => this.addLayerToMap(layer));
    }

    private render(): void {
        this.container.classList.add('map');
        this.shadowRoot.append(this.container);

        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjY2YmYxNy1mNTM2LTRlOWYtYTUyZC01ZmY0NjBhNzllMWEiLCJpZCI6MTY5MDU3LCJpYXQiOjE2OTU4ODQ4NzB9.bN66rOR5h37xuKVsuUSYRSLOGJy-34IhH9S1hr4NOOE';
        this.viewer = new Cesium.Viewer(this.container, {
            baseLayerPicker: false,
            geocoder: false,
            timeline: false,
            animation: false,
            homeButton: false,
            navigationInstructionsInitiallyVisible: false,
            navigationHelpButton: false,
            sceneModePicker: false,
            fullscreenButton: false,
            infoBox: false,
            sceneMode: Cesium.SceneMode.SCENE2D,
            mapMode2D: Cesium.MapMode2D.ROTATE,
            mapProjection: new Cesium.WebMercatorProjection()
        });
    }

    private setup(): void {
        this.viewer.screenSpaceEventHandler.setInputAction((movement: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
            this.mouseOver(movement);
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        this.viewer.screenSpaceEventHandler.setInputAction((movement: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
            this.clickOnMap(movement);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        if (PositionService.instance.position) {
            this.setCameraToPosition(PositionService.instance.position);
            this.checkUserPin(PositionService.instance.position);
        } else {
            this.setCameraToPosition(null);
        }

        EventObservable.instance.subscribe('change-theme', (data: { isPhysicalMap: boolean, theme: MapTheme }) => this.changeTheme(data.isPhysicalMap, data.theme));
        EventObservable.instance.subscribe('change-map-mode', () => this.changeMapMode());
        EventObservable.instance.subscribe('toggle-physical-map', (data: { isPhysicalMap: boolean, currentTheme: MapTheme }) => this.togglePhysicalMap(data.isPhysicalMap, data.currentTheme));
        EventObservable.instance.subscribe('set-camera', (position: GeolocationPosition) => this.setCameraToPosition(position));
        EventObservable.instance.subscribe('check-user-position', (position: GeolocationPosition) => this.checkUserPin(position));
        EventObservable.instance.subscribe('add-layer', (layer: Layer) => this.addLayer(layer));
        EventObservable.instance.subscribe('unbench-layer', (layer: Layer) => this.unbenchLayer(layer));
        EventObservable.instance.subscribe('remove-layer-from-bench', (layer: Layer) => this.removeLayerFromBench(layer));
        EventObservable.instance.subscribe('bench-layer', (layer: Layer) => this.benchLayer(layer));
        EventObservable.instance.subscribe('load-custom-path', (path: Path) => {
            let geojson: any = MapService.instance.createGeojsonFeatureCollectionFromPois(path.pois);
            this.loadCustomDataSource(geojson, 'custom-path');
        });
        EventObservable.instance.subscribe('selected-poi', (poi: PointOfInterest | null) => {
            if (!poi || poi.type !== PoiType.Point) return;
            let geojson: any = MapService.instance.createGeojsonFeatureCollectionFromPois([poi]);
            this.loadCustomDataSource(geojson, 'selected-feature');
        });
    }

    private mouseOver(movement: Cesium.ScreenSpaceEventHandler.MotionEvent): void {
        const windowPosition: Cesium.Cartesian2 = movement.endPosition;
        const pickedEntity: Cesium.Cesium3DTileFeature = this.viewer.scene.pick(windowPosition);

        pickedEntity ? document.body.style.cursor = 'pointer' : document.body.style.cursor = 'default';
    }

    private clickOnMap(movement: Cesium.ScreenSpaceEventHandler.PositionedEvent): void {
        EventObservable.instance.publish('empty-searchbar', null);

        const windowPosition: Cesium.Cartesian2 = movement.position;
        const pickedObject: any = this.viewer.scene.pick(windowPosition);

        if (!pickedObject || !pickedObject.id) {
            TabsToggleObservable.instance.isOpen = false;
            BenchToggleObservable.instance.isOpen = false;
            PoiService.instance.selectedPoi = null;
            this.removeCustomDataSource('selected-feature');
            return;
        }

        if (!(pickedObject.id instanceof Cesium.Entity)) {
            PoiService.instance.selectedPoi = null;
            this.removeCustomDataSource('selected-feature');
            return;
        }

        const entity: Cesium.Entity = pickedObject.id;

        if (entity.id === 'user-pin') {
            PoiService.instance.selectedPoi = null;
            this.removeCustomDataSource('selected-feature');
            return;
        }

        if (entity.name && (entity.name.includes('selected-feature') || entity.name.includes('custom-path'))) {
            PoiService.instance.selectedPoi = null;
            this.removeCustomDataSource('selected-feature');
            return;
        }

        BenchToggleObservable.instance.isOpen = false;
        TabsToggleObservable.instance.isOpen = true;

        const selectedPoiGeojson: any = MapService.instance.createGeoJsonFromEntity(entity);
        this.loadCustomDataSource(selectedPoiGeojson, 'selected-feature');

        const poi: PointOfInterest = PoiService.instance.parsePoi(entity);
        PoiService.instance.selectedPoi = poi;
        this.setCameraToPosition(poi.position);
    }

    private addBaseLayers(themes: MapTheme[]): void {
        themes.forEach((theme: MapTheme) => {
            const imagerylayer: Cesium.ImageryLayer = new Cesium.ImageryLayer(ThemeService.instance.createImageryProvider(theme));
            this.viewer.imageryLayers.add(imagerylayer);
            this.imageryLayers[theme.layer] = imagerylayer;
        });
    }

    public changeTheme(isPhysicalMap: boolean, theme: MapTheme): void {
        if (isPhysicalMap) return;
        const index: number = this.viewer.imageryLayers.indexOf(this.imageryLayers[theme.layer]);
        let choosenTheme: Cesium.ImageryLayer = this.viewer.imageryLayers.get(index);
        this.viewer.imageryLayers.raiseToTop(choosenTheme);
    }

    public togglePhysicalMap(isPhysicalMap: boolean, currentTheme: MapTheme): void {
        if (isPhysicalMap) {
            for (const key in this.imageryLayers) {
                const index: number = this.viewer.imageryLayers.indexOf(this.imageryLayers[key]);
                const theme: Cesium.ImageryLayer = this.viewer.imageryLayers.get(index);
                this.viewer.imageryLayers.lowerToBottom(theme);
            }
        } else {
            this.changeTheme(isPhysicalMap, currentTheme);
        }
    }

    public changeMapMode(): void {
        let currentMode: Cesium.SceneMode = this.viewer.scene.mode;
        currentMode === Cesium.SceneMode.SCENE3D ? this.viewer.scene.morphTo2D(1) : this.viewer.scene.morphTo3D(1);
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

    public checkUserPin(position: GeolocationPosition): void {
        const userPin: Cesium.Entity | undefined = this.viewer.entities.getById('user-pin');
        userPin ? this.updateUserPin(userPin, position) : this.createUserPin(position);
    }

    private createUserPin(position: GeolocationPosition): void {
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

    public async loadCustomDataSource(geojson: any, name: string): Promise<void> {
        let dataSource: Cesium.DataSource = await Cesium.GeoJsonDataSource.load(geojson);
        const existingDataSources: Cesium.DataSource[] = this.viewer.dataSources.getByName(name);
        existingDataSources.forEach((dataSource: Cesium.DataSource) => this.viewer.dataSources.remove(dataSource));

        dataSource.name = name;
        MapService.instance.styleFeature(dataSource, LayerStyle.createEmpty());
        await this.viewer.dataSources.add(dataSource);
        dataSource.entities.values.forEach((entity: Cesium.Entity, index: number) => entity.name = `${name}-${index}`);
        this.viewer.dataSources.lowerToBottom(dataSource);
    }

    public removeCustomDataSource(name: string): void {
        const existingDataSources: Cesium.DataSource[] = this.viewer.dataSources.getByName(name);
        existingDataSources.forEach((dataSource: Cesium.DataSource) => this.viewer.dataSources.remove(dataSource));
    }

    public async addLayerToMap(layer: Layer): Promise<void> {
        try {
            const geoJson: any = MapService.instance.createGeoJson(layer);
            const dataSource: Cesium.DataSource = await Cesium.GeoJsonDataSource.load(geoJson);
            dataSource.name = layer.layer;
            this.viewer.dataSources.add(dataSource);
            MapService.instance.styleFeature(dataSource, layer.style);
        } catch (error) {
            throw error;
        }
    }

    public isLayerOnMap(layer: Layer): boolean {
        const foundDataSources: Cesium.DataSource[] = this.viewer.dataSources.getByName(layer.layer);
        return foundDataSources.length > 0 ? true : false;
    }

    public addLayerToActiveLayers(layer: Layer): void {
        const activeLayers: Layer[] = StorageService.instance.activeLayers;
        activeLayers.unshift(layer);
        StorageService.instance.activeLayers = [...activeLayers];

        let benchLayers: Layer[] = StorageService.instance.benchLayers;

        const isBenched: boolean = benchLayers.some((l: Layer) => l.layer === layer.layer);
        if (isBenched) {
            benchLayers = benchLayers.filter((l: Layer) => l.layer !== layer.layer);
            StorageService.instance.benchLayers = benchLayers;
        }
    }

    public removeLayerFromMap(layer: Layer): void {
        const foundDataSources: Cesium.DataSource[] = this.viewer.dataSources.getByName(layer.layer);
        foundDataSources.forEach((dataSource: Cesium.DataSource) => this.viewer.dataSources.remove(dataSource));
    }

    public removeLayerFromActiveLayers(layer: Layer): void {
        let activeLayers: Layer[] = StorageService.instance.activeLayers;
        activeLayers = activeLayers.filter((l: Layer) => l.layer !== layer.layer);
        StorageService.instance.activeLayers = [...activeLayers];
    }

    public removeLayer(layer: Layer): void {
        let activeLayers: Layer[] = StorageService.instance.activeLayers;
        const foundDataSources: Cesium.DataSource[] = this.viewer.dataSources.getByName(layer.layer);
        foundDataSources.forEach((dataSource: Cesium.DataSource) => this.viewer.dataSources.remove(dataSource));

        activeLayers = activeLayers.filter((l: Layer) => l.layer !== layer.layer);
        StorageService.instance.activeLayers = [...activeLayers];
    }

    public addLayerToBench(layer: Layer): void {
        let benchLayers: Layer[] = StorageService.instance.benchLayers;
        benchLayers.unshift(layer);
        StorageService.instance.benchLayers = [...benchLayers];
    }

    public removeLayerFromBench(layer: Layer): void {
        let benchLayers: Layer[] = StorageService.instance.benchLayers;
        benchLayers = benchLayers.filter((l: Layer) => l.layer !== layer.layer);
        StorageService.instance.benchLayers = benchLayers;
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
}

customElements.define('app-map', MapComponent);