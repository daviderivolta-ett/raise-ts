import * as Maplibre from 'maplibre-gl';
import MaplibreStyle from 'maplibre-gl/dist/maplibre-gl.css?raw';
import { EventObservable } from '../../../observables/event.observable';
import { Layer } from '../../../models/layer.model';
import { MapService } from '../../../services/map.service';
import { FeatureGeometryType } from '../../../models/feature.model';

export class MaplibreComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    public container: HTMLDivElement;
    public map: Maplibre.Map;

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

        this.map = new Maplibre.Map({
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

    private render(): void {

    }

    private setup(): void {
        EventObservable.instance.subscribe('add-layer', (layer: Layer) => this.addLayer(layer));
    }

    private addLayer(layer: Layer): void {
        this.addLayerToMap(layer);
    }

    private async addLayerToMap(layer: Layer): Promise<void> {
        const geoJSONs: any[] = await MapService.instance.createGeoJSONs(layer);
        console.log(geoJSONs);

        for (let i = 0; i < geoJSONs.length; i++) {
            const geoJSON: any = geoJSONs[i];
            const type: 'circle' | 'line' | 'fill' = MapService.instance.getGeoJSONLayerSpecificationType(geoJSON.features[0].geometry.type);
            const id: string = `${layer.layer}_${type}`;

            const source: Maplibre.GeoJSONSourceSpecification = {
                type: 'geojson',
                data: geoJSON
            }

            this.map.addSource(id, source);            
            this.map.addLayer(MapService.instance.createGeoJSONLayerSpecification(id, type, id));
        }

        console.log(this.map.getStyle());
    }

    public disconnectedCallback(): void {
        EventObservable.instance.unsubscribeAll('add-layer');
    }

}

customElements.define('app-maplibre', MaplibreComponent);