import { Map, MapMouseEvent, GeoJSONSourceSpecification } from 'maplibre-gl';
import MaplibreStyle from 'maplibre-gl/dist/maplibre-gl.css?raw';
import { EventObservable } from '../../../observables/event.observable';
import { Layer } from '../../../models/layer.model';
import { MapService } from '../../../services/map.service';
import { StorageService } from '../../../services/storage.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { SnackbarType } from '../../../models/snackbar-type.model';

export class MaplibreComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    public container: HTMLDivElement;
    public map: Map;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        const style: HTMLStyleElement = document.createElement('style');
        style.innerHTML =
            `
            #maplibre {
                height: 100dvh;
            }
            `
            ;
        this.shadowRoot.append(style);

        const sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(MaplibreStyle);
        this.shadowRoot.adoptedStyleSheets.push(sheet);

        this.container = document.createElement('div');
        this.container.id = 'maplibre';
        this.shadowRoot.append(this.container);

        this.map = new Map({
            container: this.container,
            style: './settings/map-style.json',
            center: [8.934080815653985, 44.40753207658791],
            zoom: 15
        });
    }

    public async connectedCallback(): Promise<void> {
        this.render();
        this.setup();
    }

    private render(): void { }

    private setup(): void {
        this.map.on('load', () => StorageService.instance.activeLayers.forEach((layer: Layer) => this.addLayerToMap(layer)));
        this.map.on('click', (e: MapMouseEvent) => {           
            this.handleClick(e);
        });

        EventObservable.instance.subscribe('add-layer', (layer: Layer) => this.addLayer(layer));
        EventObservable.instance.subscribe('bench-layer', (layer: Layer) => this.benchLayer(layer));
        EventObservable.instance.subscribe('bench-all-layers', () => this.benchAllLayers());
        EventObservable.instance.subscribe('unbench-layer', (layer: Layer) => this.unbenchLayer(layer));
        EventObservable.instance.subscribe('remove-layer-from-bench', (layer: Layer) => this.removeLayerFromBench(layer));
    }

    private handleClick(e: MapMouseEvent): void {
        console.log(e); 
        EventObservable.instance.publish('empty-searchbar', null);

        const features = this.map.queryRenderedFeatures(e.point);
        console.log(features);        
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
        const geoJSONs: any[] = await MapService.instance.createGeoJSONs(layer);

        for (let i = 0; i < geoJSONs.length; i++) {
            const geoJSON: any = geoJSONs[i];
            const type: 'circle' | 'line' | 'fill' = MapService.instance.getGeoJSONLayerSpecificationType(geoJSON.features[0].geometry.type);
            const id: string = `${layer.layer}_${type}`;

            const source: GeoJSONSourceSpecification = {
                type: 'geojson',
                data: geoJSON
            }

            this.map.addSource(id, source);
            this.map.addLayer(MapService.instance.createGeoJSONLayerSpecification(id, type, layer.style));
            // console.log(this.map.getStyle());
        }
    }

    public removeLayerFromMap(layer: Layer): void {
        if (this.map.getLayer(layer.layer + '_circle') && this.map.getSource(layer.layer + '_circle')) {
            this.map.removeLayer(layer.layer + '_circle');
            this.map.removeSource(layer.layer + '_circle');
        } else if (this.map.getLayer(layer.layer + '_line') && this.map.getSource(layer.layer + '_line')) {
            this.map.removeLayer(layer.layer + '_line');
            this.map.removeSource(layer.layer + '_line');
        } else if (this.map.getLayer(layer.layer + '_fill') && this.map.getSource(layer.layer + '_fill')) {
            this.map.removeLayer(layer.layer + '_fill');
            this.map.removeSource(layer.layer + '_fill');
        }
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
        EventObservable.instance.unsubscribeAll('add-layer');
        EventObservable.instance.unsubscribeAll('bench-layer');
        EventObservable.instance.unsubscribeAll('bench-all-layers');
        EventObservable.instance.unsubscribeAll('unbench-layer');
        EventObservable.instance.unsubscribeAll('remove-layer-from-bench');
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
}

customElements.define('app-maplibre', MaplibreComponent);