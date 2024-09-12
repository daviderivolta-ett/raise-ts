import maplibregl, { Map, MapMouseEvent, MapGeoJSONFeature, Marker, GeolocateControl, LngLat, AttributionControl, LayerSpecification, NavigationControl } from 'maplibre-gl';
import { EventObservable } from '../../../observables/event.observable';
import { Layer } from '../../../models/layer.model';
import { MapService } from '../../../services/map.service';
import { StorageService } from '../../../services/storage.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { SnackbarType } from '../../../models/snackbar-type.model';
import { TabsToggleObservable } from '../../../observables/tabs-toggle.observable';
import { SidenavStatus } from '../../../models/sidenav.model';
import { BenchToggleObservable } from '../../../observables/bench-toggle.observable';
import { PoiService } from '../../../services/poi.service';
import { PoiType, PointOfInterest } from '../../../models/poi.model';
import { Path } from '../../../models/path.model';
import { PositionService } from '../../../services/position.service';
import MaplibreStyle from 'maplibre-gl/dist/maplibre-gl.css?raw';
import style from './maplibre.component.scss?raw';
import { ThemeService } from '../../../services/theme.service';
import { PMTiles, Protocol } from 'pmtiles';
import { MapTerrainControl } from '../map-terrain-control/map-terrain-control.component';
import { PointsCloudControl } from '../point-clouds-control/points-cloud-control.component';

export class MaplibreComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    public container: HTMLDivElement;
    public map: Map;
    public markers: Marker[] = [];
    private _isOpen: boolean = false;

    public get isOpen(): boolean {
        return this._isOpen;
    }

    public set isOpen(isOpen: boolean) {
        this._isOpen = isOpen;
        this.isOpen === true ? this.classList.add('reduce') : this.classList.remove('reduce');
    }

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        const maplibreSheet: CSSStyleSheet = new CSSStyleSheet();
        maplibreSheet.replaceSync(MaplibreStyle);
        this.shadowRoot.adoptedStyleSheets.push(maplibreSheet);

        const sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);

        this.container = document.createElement('div');
        this.container.id = 'maplibre';
        this.shadowRoot.append(this.container);

        this.map = new Map({
            container: this.container,
            style: ThemeService.instance.chooseMapColor(ThemeService.instance.currentTheme),
            center: [8.934080815653985, 44.40753207658791],
            zoom: 15,
            attributionControl: false,
            dragRotate: false
        });

        const attributionControl = new AttributionControl();
        this.map.addControl(attributionControl, 'bottom-left');

        const geolocateControl: GeolocateControl = new GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showAccuracyCircle: false,
            showUserLocation: true
        });
        this.map.addControl(geolocateControl, 'bottom-right');

        const navigationControl: NavigationControl = new NavigationControl({
            visualizePitch: true,
            showCompass: true,
            showZoom: false
        });
        this.map.addControl(navigationControl, 'bottom-right');

        const terrainControl: MapTerrainControl = new MapTerrainControl();
        this.map.addControl(terrainControl, 'bottom-right');

        geolocateControl.on('geolocate', (e: GeolocationPosition) => {
            PositionService.instance.position = e;
        });

        const pointsCloudControl: PointsCloudControl = new PointsCloudControl();
        this.map.addControl(pointsCloudControl, 'bottom-right');
    }

    public async connectedCallback(): Promise<void> {
        this.render();
        this.setup();
    }

    private render(): void { }

    private setup(): void {
        this.map.on('load', () => StorageService.instance.activeLayers.forEach((layer: Layer) => this.addLayerToMap(layer)));
        this.map.on('load', () => this.addTerrainLayer());
        this.map.on('click', (e: MapMouseEvent) => {
            this.handleClick(e);
        });
        this.map.on('mousemove', (e) => {
            const features = this.map.queryRenderedFeatures(e.point);
            const hasCustomSource: boolean = features.some((feature: MapGeoJSONFeature) => feature.source !== 'protomaps');
            if (hasCustomSource) {
                this.map.getCanvas().style.cursor = 'pointer';
            } else {
                this.map.getCanvas().style.cursor = '';
            }
        });

        EventObservable.instance.subscribe('toggle-tabs', (isOpen: boolean) => this.isOpen = isOpen);
        EventObservable.instance.subscribe('sidenav-status-change', (status: SidenavStatus) => status === SidenavStatus.Close ? this.isOpen = false : this.isOpen = true);
        EventObservable.instance.subscribe('change-theme', (theme: any) => this.changeTheme(theme));
        // EventObservable.instance.subscribe('toggle-terrain', (isTerrainActive: boolean) => this.toggleTerrainLayer(isTerrainActive));
        EventObservable.instance.subscribe('add-layer', (layer: Layer) => this.addLayer(layer));
        EventObservable.instance.subscribe('bench-layer', (layer: Layer) => this.benchLayer(layer));
        EventObservable.instance.subscribe('bench-all-layers', () => this.benchAllLayers());
        EventObservable.instance.subscribe('unbench-layer', (layer: Layer) => this.unbenchLayer(layer));
        EventObservable.instance.subscribe('remove-layer-from-bench', (layer: Layer) => this.removeLayerFromBench(layer));
        EventObservable.instance.subscribe('load-custom-path', (path: Path) => {
            this.markers.forEach((marker: Marker) => marker.remove());

            path.pois.forEach(async (poi: PointOfInterest) => {
                const marker: Marker | null = await this.createCustomMarker(path.id, '#1152F7', '#fff');
                if (marker) {
                    this.markers.push(marker);
                    marker.setLngLat(poi.position).addTo(this.map);
                }
            });
        });
        EventObservable.instance.subscribe('selected-poi', async (poi: PointOfInterest | null) => {
            if (!poi || poi.type !== PoiType.Point) return;
            this.markers.forEach((marker: Marker) => marker.remove());
            this.removeCustomLayer('selected-feature');

            const marker = await this.createCustomMarker('selected-feature', '#EA4335', '#B31412');
            if (marker) {
                this.markers.push(marker);
                marker.setLngLat(poi.position).addTo(this.map);
            }

            this.setCameraToPosition(poi.position);
        });
    }

    private addTerrainLayer() {
        const protocol = new Protocol();
        maplibregl.addProtocol('pmtiles', protocol.tile.bind(protocol));

        const PMTILES_URL = 'https://r2-public.protomaps.com/protomaps-sample-datasets/terrarium_z9.pmtiles';
        const pmtiles = new PMTiles(PMTILES_URL);

        pmtiles.getHeader().then(() => {
            this.map.addSource('terrain', {
                type: 'raster-dem',
                url: `pmtiles://${PMTILES_URL}`,
                attribution: '<a href="https://github.com/tilezen/joerd/blob/master/docs/attribution.md">Tilezen Joerd: Attribution</a>',
                encoding: 'terrarium',
                tileSize: 16
            });

            // this.map.addLayer({
            //     id: 'terrain',
            //     source: 'terrain',
            //     type: 'hillshade',
            //     minzoom: 10,
            // });

            // this.map.setTerrain({ source: 'terrain', exaggeration: 2 });

            // const terrainLayer = this.map.getLayer('terrain');
            // if (!terrainLayer) return;
            // terrainLayer.visibility = 'none';

        }).catch(error => {
            console.error('Error loading PMTiles header:', error);
        });
    }

    // private toggleTerrainLayer(isTerrainActive: boolean): void {
    //     const duration: number = 1000;

    //     if (isTerrainActive) {
    //         this.map.dragRotate.enable();
    //         this.map.easeTo({
    //             pitch: 60,
    //             duration,
    //             // easing(t) {
    //             //     return t < 0.5 ?
    //             //         (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 :
    //             //         (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
    //             // },
    //             essential: true
    //         });
    //         setTimeout(() => {
    //             this.map.setTerrain({ source: 'terrain', exaggeration: 2 });
    //         }, duration * 2);
    //     } else {
    //         this.map.dragRotate.disable();
    //         this.map.easeTo({
    //             pitch: 0,
    //             bearing: 0,
    //             duration,
    //             // easing(t) {
    //             //     return t < 0.5 ?
    //             //         (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 :
    //             //         (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
    //             // },
    //             essential: true
    //         });
    //         setTimeout(() => {
    //             this.map.setTerrain({ source: 'terrain', exaggeration: 0 });
    //         }, duration * 2);
    //     }
    // }

    private async handleClick(e: MapMouseEvent): Promise<void> {
        EventObservable.instance.publish('empty-searchbar', null);
        const features: MapGeoJSONFeature[] = this.map.queryRenderedFeatures(e.point).filter((feature: MapGeoJSONFeature) => feature.source !== 'protomaps');

        this.removeCustomMarkers('selected-feature');
        this.removeCustomMarkers('custom-path');
        this.markers.forEach((marker: Marker) => marker.remove());
        this.removeCustomLayer('selected-feature');

        if (features.length === 0) {
            TabsToggleObservable.instance.status = SidenavStatus.Close;
            BenchToggleObservable.instance.isOpen = false;
            PoiService.instance.selectedPoi = null;
            return;
        }

        const feature: MapGeoJSONFeature = features[0];
        this.createCustomLayerFromFeature(feature);
        const selectedPoi: PointOfInterest = PoiService.instance.createPoiFromFeature(feature);

        TabsToggleObservable.instance.status = SidenavStatus.Open;
        BenchToggleObservable.instance.isOpen = false;

        this.setCameraToPosition(selectedPoi.position);

        PoiService.instance.selectedPoi = selectedPoi;
    }

    private async createCustomMarker(className: string, primaryColor: string, secondaryColor: string): Promise<Marker | null> {
        try {
            const res: Response = await fetch('./images/pin.svg');
            const text: string = await res.text();

            const div: HTMLDivElement = document.createElement('div');
            div.style.height = '32px';
            div.style.width = '32px';
            div.innerHTML = text;

            const svg: SVGSVGElement | null = div.querySelector('svg');
            if (!svg) return null;

            svg.style.fill = 'red';

            const pin: SVGPathElement | null = div.querySelector('path');
            if (pin) {
                pin.style.fill = primaryColor;
                pin.style.stroke = secondaryColor;
                pin.style.strokeWidth = '1';
            }
            const circle: SVGCircleElement | null = div.querySelector('circle');
            if (circle) circle.style.fill = secondaryColor;

            return new Marker({ className: className, element: div });
        } catch (error) {
            console.error('Errore nel caricamento del file SVG:', error);
            return null;
        }
    }

    private removeCustomMarkers(className: string): void {
        this.markers = this.markers.filter((marker: Marker) => {
            const element = marker.getElement();
            if (element) {
                if (element.classList.contains(className)) {
                    marker.remove();
                    return false;
                }
            }
            return true;
        });
    }

    private async createCustomLayerFromFeature(feature: MapGeoJSONFeature) {
        if (feature.geometry.type === 'Point') {
            const marker = await this.createCustomMarker('selected-feature', '#EA4335', '#B31412');
            if (marker) {
                this.markers.push(marker);
                marker.setLngLat((feature as any).geometry.coordinates).addTo(this.map);
            }
        } else {
            const geoJSON: any = this.createGeoJSONFromFeature(feature);
            this.map.addSource('selected-feature', {
                type: 'geojson',
                data: geoJSON
            });

            switch (feature.geometry.type) {
                case 'Polygon':
                    this.map.addLayer({
                        id: 'selected-feature',
                        source: 'selected-feature',
                        type: 'line',
                        paint: {
                            "line-color": 'crimson',
                            "line-width": 2
                        },
                        filter: ['==', ['geometry-type'], 'Polygon']
                    });
                    break;

                case 'LineString':
                    this.map.addLayer({
                        id: 'selected-feature',
                        source: 'selected-feature',
                        type: 'line',
                        paint: {
                            "line-color": 'crimson',
                            "line-width": 4
                        },
                        filter: ['==', ['geometry-type'], 'LineString']
                    });
                    break;

            }
        }
    }

    private createGeoJSONFromFeature(feature: MapGeoJSONFeature) {
        return {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: feature.properties,
                    geometry: feature.geometry
                }
            ]
        }
    }

    private removeCustomLayer(className: string) {
        if (this.map.getSource(className) || this.map.getLayer(className)) {
            this.map.removeLayer(className);
            this.map.removeSource(className);
        }
    }

    private async addLayer(layer: Layer): Promise<void> {
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

    public benchAllLayers(): void {
        StorageService.instance.activeLayers.forEach((layer: Layer) => {
            this.removeLayerFromMap(layer);
            this.removeLayerFromActiveLayers(layer);
            this.addLayerToBench(layer);
        });
    }

    private async addLayerToMap(layer: Layer): Promise<void> {
        const geoJSON: any = await MapService.instance.createGeoJsonFromLayer(layer);
        const sourceId: string = layer.layer;

        if (!this.map.getSource(sourceId)) {
            this.map.addSource(sourceId, {
                type: 'geojson',
                data: geoJSON
            });
        }

        this.map.addLayer({
            id: sourceId + '_circle',
            source: sourceId,
            type: 'circle',
            paint: {
                "circle-radius": 4,
                "circle-color": layer.style.color,
                "circle-opacity": .5,
                "circle-stroke-color": layer.style.color,
                "circle-stroke-opacity": 1,
                "circle-stroke-width": 2
            },
            filter: ['==', ['geometry-type'], 'Point']
        });

        this.map.addLayer({
            id: sourceId + '_line',
            source: sourceId,
            type: 'line',
            paint: {
                "line-color": layer.style.color,
                "line-width": 4
            },
            filter: ['==', ['geometry-type'], 'LineString']
        }, 'buildings');

        this.map.addLayer({
            id: sourceId + '_fill',
            source: sourceId,
            type: 'fill',
            paint: {
                "fill-color": layer.style.color,
                "fill-opacity": .5,
                "fill-outline-color": layer.style.color
            },
            filter: ['==', ['geometry-type'], 'Polygon']
        }, 'buildings');
    }

    public removeLayerFromMap(layer: Layer): void {
        if (this.map.getLayer(layer.layer + '_circle')) this.map.removeLayer(layer.layer + '_circle');
        if (this.map.getLayer(layer.layer + '_line')) this.map.removeLayer(layer.layer + '_line');
        if (this.map.getLayer(layer.layer + '_fill')) this.map.removeLayer(layer.layer + '_fill');
        if (this.map.getImage(layer.layer)) this.map.removeImage(layer.layer);
        if (this.map.getSource(layer.layer)) this.map.removeSource(layer.layer);
    }

    public removeLayerFromActiveLayers(layer: Layer): void {
        let activeLayers: Layer[] = StorageService.instance.activeLayers;
        activeLayers = activeLayers.filter((l: Layer) => l.layer !== layer.layer);
        StorageService.instance.activeLayers = [...activeLayers];
    }

    public isLayerOnMap(layer: Layer): boolean {
        if (this.map.getLayer(layer.layer + '_circle') || this.map.getLayer(layer.layer + '_line') || this.map.getLayer(layer.layer + '_fill')) {
            return true;
        } else {
            return false;
        }
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

    public disconnectedCallback(): void {
        EventObservable.instance.unsubscribeAll('toggle-tabs');
        EventObservable.instance.unsubscribeAll('sidenav-status-change');
        EventObservable.instance.unsubscribeAll('change-theme');
        EventObservable.instance.unsubscribeAll('toggle-terrain');
        EventObservable.instance.unsubscribeAll('add-layer');
        EventObservable.instance.unsubscribeAll('bench-layer');
        EventObservable.instance.unsubscribeAll('bench-all-layers');
        EventObservable.instance.unsubscribeAll('unbench-layer');
        EventObservable.instance.unsubscribeAll('remove-layer-from-bench');
        EventObservable.instance.unsubscribeAll('load-custom-path');
        EventObservable.instance.unsubscribeAll('selected-poi');
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

    public setCameraToPosition(position: LngLat): void {
        const currentZoom: number = this.map.getZoom();

        this.map.flyTo({
            center: position,
            zoom: currentZoom < 15 ? 15 : currentZoom,
            speed: 2,
            curve: 2,
            easing(t) {
                return t < 0.5 ?
                    (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 :
                    (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
            },
            essential: true
        });
    }

    private changeTheme(theme: any): void {
        const currentThemeLayers: LayerSpecification[] = this.map.getStyle().layers;

        theme.layers.forEach((newLayer: any) => {
            if (newLayer.id) {
                const currentLayer: LayerSpecification | undefined = currentThemeLayers.find((currentLayer: LayerSpecification) => currentLayer.id === newLayer.id);
                if (currentLayer && currentLayer.paint) {
                    Object.keys(newLayer.paint || {}).forEach((paintProperty: string) => {
                        const paintValue: any = newLayer.paint[paintProperty];
                        if (paintValue !== undefined) {
                            this.map.setPaintProperty(newLayer.id, paintProperty, paintValue);
                        }
                    });
                }
            }
        });
    }
}

customElements.define('app-maplibre', MaplibreComponent);