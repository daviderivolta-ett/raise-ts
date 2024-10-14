import { LayerSpecification, LngLat, Marker } from 'maplibre-gl';
import { SplashComponent } from '../../../components/splash/splash.component';
import { Layer, PropertyType } from '../../../models/layer.model';
import { Path } from '../../../models/path.model';
import { PointOfInterest, PoiProperty, PoiType } from '../../../models/poi.model';
import { SidenavStatus } from '../../../models/sidenav.model';
import { SnackbarType } from '../../../models/snackbar-type.model';
import { BenchToggleObservable } from '../../../observables/bench-toggle.observable';
import { EventObservable } from '../../../observables/event.observable';
import { TabsToggleObservable } from '../../../observables/tabs-toggle.observable';
import { DataService } from '../../../services/data.service';
import { MapService } from '../../../services/map.service';
import { PoiService } from '../../../services/poi.service';
import { PositionService } from '../../../services/position.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { StorageService } from '../../../services/storage.service';
import { MapComponent } from '../maplibre/map.component';

import style from './map.page.scss?raw';
import { ThemeService } from '../../../services/theme.service';

export class MapPage extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private controller: AbortController | null = null;

    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'closed' });


        let sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
    }

    public async connectedCallback(): Promise<void> {
        const splash: SplashComponent = document.createElement('app-splash') as SplashComponent;
        document.body.append(splash);

        await DataService.instance.getData();

        if (!StorageService.instance.paths.some((path: Path) => path.name === 'default')) StorageService.instance.saveNewPath('default');
        const selectedPath: Path | undefined = StorageService.instance.paths.find((path: Path) => path.lastSelected === true);
        if (selectedPath) StorageService.instance.selectedCustomPath = { ...selectedPath };

        this.render();
        this.setup();
        setTimeout(() => splash.remove(), 500);
    }

    public disconnectedCallback(): void {
        const mapComponent: MapComponent = this.shadowRoot.querySelector('app-map') as MapComponent;
        mapComponent.removeEventListener('position-updated', (event: Event) => this._updatePosition(event));
        mapComponent.removeEventListener('map-loaded', () => this._handleMapLoad(mapComponent));
        mapComponent.removeEventListener('map-click', (event: Event) => this._handleMapClick(event));
        EventObservable.instance.unsubscribeAll('sidenav-status-change');
        EventObservable.instance.unsubscribeAll('add-layer');
        EventObservable.instance.unsubscribeAll('bench-layer');
        EventObservable.instance.unsubscribeAll('bench-all-layers');
        EventObservable.instance.unsubscribeAll('unbench-layer');
        EventObservable.instance.unsubscribeAll('remove-layer-from-bench');
        EventObservable.instance.unsubscribeAll('load-custom-path');
        EventObservable.instance.unsubscribeAll('selected-poi');
        EventObservable.instance.unsubscribeAll('add-optimal-path');
        EventObservable.instance.unsubscribeAll('remove-optimal-path');
    }

    private render(): void {
        // html
        this.shadowRoot.innerHTML =
            `
            <div class="page">
                <!-- <app-maplibre></app-maplibre> -->
                <app-map></app-map>
                <div class="header">
                    <div class="search">
                        <button is="app-tabs-toggle" class="fa-button">
                            <span class="icon">
                                <span class="material-symbols-outlined">menu</span>
                            </span>
                        </button>
                        <input is="app-searchbar" type="text" placeholder="Cerca per livelli...">
                        <button is="app-bench-toggle" class="fa-button">
                            <span class="icon">
                                <span class="material-symbols-outlined">stacks</span>
                            </span>
                        </button>
                        <button is="app-map-theme-btn" class="fa-button">
                            <span class="icon">
                                <span class="material-symbols-outlined">contrast</span>
                            </span>
                        </button>
                        <button class="fa-button tags-page-link">
                            <span class="icon">
                                <span class="material-symbols-outlined">label</span>
                            </span>
                        </button>
                    </div>
                    <app-carousel></app-carousel>
                </div>
                <app-search-result></app-search-result>
                <app-tabs-sidenav></app-tabs-sidenav>
                <app-bench></app-bench>
            </div>
            `
            ;
    }

    private setup(): void {
        const link: HTMLButtonElement | null = this.shadowRoot.querySelector('.tags-page-link');
        if (!link) return;
        link.addEventListener('click', () => window.location.hash = '/');
        this._setupMap();
    }

    private _setupMap(): void {
        const mapComponent: MapComponent = this.shadowRoot.querySelector('app-map') as MapComponent;
        mapComponent.addEventListener('position-updated', (event: Event) => this._updatePosition(event));
        mapComponent.addEventListener('map-loaded', () => this._handleMapLoad(mapComponent));
        mapComponent.addEventListener('map-click', (event: Event) => this._handleMapClick(event));
        EventObservable.instance.subscribe('sidenav-status-change', (status: SidenavStatus) => mapComponent.isMinimal = status === SidenavStatus.Close ? false : true);
        EventObservable.instance.subscribe('add-layer', (layer: Layer) => this._handleAddLayer(mapComponent, layer));
        EventObservable.instance.subscribe('bench-layer', (layer: Layer) => this._handleBenchLayer(mapComponent, layer));
        EventObservable.instance.subscribe('bench-all-layers', () => this._handleBenchAllLayers(mapComponent));
        EventObservable.instance.subscribe('unbench-layer', (layer: Layer) => this._unbenchLayer(mapComponent, layer));
        EventObservable.instance.subscribe('remove-layer-from-bench', (layer: Layer) => StorageService.instance.removeLayerFromBench(layer));
        EventObservable.instance.subscribe('load-custom-path', (path: Path) => this._handleLoadCustomPath(mapComponent, path));
        EventObservable.instance.subscribe('selected-poi', async (poi: PointOfInterest | null) => this._handleSelectedPoi(mapComponent, poi));
        EventObservable.instance.subscribe('add-optimal-path', (geoJSON: any) => this._handleAddOptimalPath(mapComponent, geoJSON));
        EventObservable.instance.subscribe('remove-optimal-path', () => mapComponent.removeLayerFromMap('optimal-path'));
        EventObservable.instance.subscribe('change-theme', (theme: any) => this._changeTheme(mapComponent, theme));
    }

    private _handleMapLoad(mapComponent: MapComponent): void {
        mapComponent.map.setStyle(ThemeService.instance.chooseMapColor(ThemeService.instance.currentTheme));

        StorageService.instance.activeLayers.forEach(async (layer: Layer) => {
            try {
                const geoJSON: any = await MapService.instance.createGeoJsonFromLayer(layer);
                mapComponent.addGeoJsonToMap(geoJSON, layer.id, layer.style.color);
            } catch (error) {
                SnackbarService.instance.createSnackbar(SnackbarType.Error, 'error', 'Errore nel caricamento del layer');
            }
        });
    }

    private async _handleMapClick(event: Event): Promise<void> {
        if (this.controller) this.controller.abort();
        this.controller = new AbortController();
        const { signal } = this.controller;

        const e = event as CustomEvent;

        BenchToggleObservable.instance.isOpen = false;
        if (e.detail.features.length > 0) {
            TabsToggleObservable.instance.status = SidenavStatus.Open;
            const poi: PointOfInterest = PoiService.instance.createPoiFromFeature(e.detail.features[0]);
            PoiService.instance.selectedPoi = poi;
        } else {
            TabsToggleObservable.instance.status = SidenavStatus.Close;
            const poi: PointOfInterest = PointOfInterest.createCustomPoi(e.detail.lngLat);
            PoiService.instance.selectedPoi = poi;
            try {
                const address: string = await MapService.instance.getAddressFromCoordinates(e.detail.lngLat, signal);
                poi.props.push(new PoiProperty('name', 'Nome', PropertyType.String, address));
            } catch (error: unknown) {
                error instanceof Error && error.name === 'AbortError' ? console.log('Richiesta annullata') : console.error(error)
            }
        }
    }

    private async _handleAddLayer(mapComponent: MapComponent, layer: Layer): Promise<void> {
        if (!mapComponent.isLayerOnMap(layer.id)) {
            try {
                SnackbarService.instance.createSnackbar(SnackbarType.Loader, layer.id, 'Caricamento...');
                const geoJSON: any = await MapService.instance.createGeoJsonFromLayer(layer);
                mapComponent.addGeoJsonToMap(geoJSON, layer.id, layer.style.color);
                StorageService.instance.addLayerToActiveLayers(layer);
                SnackbarService.instance.removeSnackbar(layer.id);
            } catch (error) {
                SnackbarService.instance.removeSnackbar(layer.id);
                SnackbarService.instance.createSnackbar(SnackbarType.Error, 'error', 'Errore nel caricamento del layer');
            }
        } else {
            SnackbarService.instance.createSnackbar(SnackbarType.Temporary, 'error', 'Layer già presente', 3);
        }
    }

    private _handleBenchLayer(mapComponent: MapComponent, layer: Layer): void {
        mapComponent.removeLayerFromMap(layer.id);
        StorageService.instance.removeLayerFromActiveLayers(layer);
        StorageService.instance.addLayerToBench(layer);
    }

    private _handleBenchAllLayers(mapComponent: MapComponent): void {
        const activeLayers: Layer[] = [...StorageService.instance.activeLayers];
        activeLayers.forEach((layer: Layer) => {
            mapComponent.removeLayerFromMap(layer.id);
            StorageService.instance.removeLayerFromActiveLayers(layer);
            StorageService.instance.addLayerToBench(layer);
        });
    }

    private async _unbenchLayer(mapComponent: MapComponent, layer: Layer): Promise<void> {
        try {
            SnackbarService.instance.createSnackbar(SnackbarType.Loader, layer.id, 'Caricamento...');
            const geoJSON: any = await MapService.instance.createGeoJsonFromLayer(layer);
            mapComponent.addGeoJsonToMap(geoJSON, layer.id, layer.style.color);
            StorageService.instance.removeLayerFromBench(layer);
            StorageService.instance.addLayerToActiveLayers(layer);
            SnackbarService.instance.removeSnackbar(layer.id);
        } catch (error) {
            SnackbarService.instance.removeSnackbar(layer.id);
            SnackbarService.instance.createSnackbar(SnackbarType.Error, 'error', 'Errore nel caricamento del layer');
        }
    }

    private async _handleLoadCustomPath(mapComponent: MapComponent, path: Path) {
        mapComponent.markers.forEach((marker) => marker.remove());
        mapComponent.markers = [];
        path.pois.forEach(async (poi: PointOfInterest) => {
            const marker: Marker | null = await mapComponent.createCustomMarker('./images/pin.svg', 'custom-path', '#1152F7', '#FFF');
            if (marker) mapComponent.addMarker(marker, new LngLat(poi.position.lng, poi.position.lat));
        });
    }

    private async _handleSelectedPoi(mapComponent: MapComponent, poi: PointOfInterest | null): Promise<void> {
        if (!poi || poi.type !== PoiType.Point) return;
        mapComponent.markers.forEach((marker) => marker.remove());
        mapComponent.markers = [];
        mapComponent.removeLayerFromMap('selected-feature');
        const marker: Marker | null = await mapComponent.createCustomMarker('./images/pin.svg', 'selected-feature', '#EA4335', '#B31412');
        if (marker) mapComponent.addMarker(marker, new LngLat(poi.position.lng, poi.position.lat));
        mapComponent.setCameraToPosition(new LngLat(poi.position.lng, poi.position.lat));
    }

    private _handleAddOptimalPath(mapComponent: MapComponent, geoJSON: any): void {
        if (mapComponent.map.getSource('optimal-path')) mapComponent.removeLayerFromMap('optimal-path');
        mapComponent.addGeoJsonToMap(geoJSON, 'optimal-path', '#1152F7');
        mapComponent.map.setCenter(MapService.instance.getGeoJsonCenter(geoJSON));
    }

    private _changeTheme(mapComponent: MapComponent, theme: any): void {
        const currentThemeLayers: LayerSpecification[] = mapComponent.map.getStyle().layers;

        theme.layers.forEach((newLayer: any) => {
            if (newLayer.id) {
                const currentLayer: LayerSpecification | undefined = currentThemeLayers.find((currentLayer: LayerSpecification) => currentLayer.id === newLayer.id);
                if (currentLayer && currentLayer.paint) {
                    Object.keys(newLayer.paint || {}).forEach((paintProperty: string) => {
                        const paintValue: any = newLayer.paint[paintProperty];
                        if (paintValue !== undefined) {
                            mapComponent.map.setPaintProperty(newLayer.id, paintProperty, paintValue);
                        }
                    });
                }
            }
        });
    }

    private _updatePosition(event: Event): void {
        const e: CustomEvent = event as CustomEvent;
        PositionService.instance.position = e.detail.position;
    }

    private _getInfoPanelSlot(): HTMLElement | null {
        const sidenav: HTMLElement | null = this.shadowRoot.querySelector('app-tabs-sidenav');
        if (!sidenav || !sidenav.shadowRoot) return null;
        const tabs: HTMLElement | null = sidenav.shadowRoot.querySelector('app-tabs');
        if (!tabs || !tabs.shadowRoot) return null;
        const panel: HTMLElement | null = tabs.shadowRoot.querySelector('app-info-panel');
        return panel;
    }
}

customElements.define('page-map', MapPage);