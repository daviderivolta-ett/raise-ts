import maplibregl, { AttributionControl, GeolocateControl, LngLat, Map, MapGeoJSONFeature, MapMouseEvent, Marker, NavigationControl } from 'maplibre-gl';
import { PMTiles, Protocol } from 'pmtiles';
import { MapTerrainControl } from '../map-terrain-control/map-terrain-control.component';
import { PointsCloudControl } from '../point-clouds-control/points-cloud-control.component';
import maplibreStyle from 'maplibre-gl/dist/maplibre-gl.css?raw';

// Template
const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML =
    `
    <div id="map"></div>
    `
    ;

// Style
const style: HTMLStyleElement = document.createElement('style');
style.innerHTML =
    `
    #map {
        height: 100dvh;
        animation: grow .3s ease-in-out forwards;
    }
    
    .map--minimal {
        animation: shrink .3s ease-in-out forwards !important;
    }

    .maplibregl-ctrl-bottom-right {
        display: flex;
        flex-direction: column;
        gap: 8px;
        bottom: 24px !important;
        right: 24px !important;
        animation: slideOut .3s ease-in-out forwards;
    }

    .maplibregl-ctrl-group {
        margin: 0 !important;
        background-color: var(--surface-container) !important;
    }

    .maplibregl-ctrl-group button {
        font-family: 'Material Symbols Outlined';
        font-size: 1.5rem;
        width: 40px !important;
        height: 40px !important;
        border-radius: var(--border-radius-l);
        color: var(--on-surface);
    }

    .maplibregl-ctrl-group button.active {
        color: var(--primary)
    }

    .map--minimal .maplibregl-ctrl-bottom-right {
        animation: slideIn .3s ease-in-out forwards;
    }

    button.maplibregl-ctrl-geolocate .maplibregl-ctrl-icon {
        background-color: var(--on-surface);
        background-image: none !important;
        mask-image: url('./images/my_location_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg');
        mask-repeat: no-repeat;
        mask-position: center;
        -webkit-mask-image: url('./images/my_location_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg');
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: center;
    }

    button.maplibregl-ctrl-geolocate-active .maplibregl-ctrl-icon {
        background-color: var(--primary);
        background-image: none !important;
        mask-image: url('./images/my_location_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg');
        mask-repeat: no-repeat;
        mask-position: center;
        -webkit-mask-image: url('./images/my_location_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg');
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: center;
    }

    button.maplibregl-ctrl-geolocate-background .maplibregl-ctrl-icon {
        background-color: var(--primary);
        background-image: none !important;
        mask-image: url('./images/location_searching_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg');
        mask-repeat: no-repeat;
        mask-position: center;
        -webkit-mask-image: url('./images/location_searching_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg');
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: center;
    }

    @keyframes shrink {
        from {
            width: 100%;
        }

        to {
            width: calc(100% - 360px);
        }
    }

    @keyframes grow {
        from {
            width: calc(100% - 360px);
        }

        to {
            width: 100%;
        }
    }

    @keyframes slideIn {
        from {
            right: 24px;
        }

        to {
            right: calc(24px + 360px);
        }
    }

    @keyframes slideOut {
        from {
            right: calc(24px + 360px);
        }

        to {
            right: 24px;
        }
    }

    @media screen and (max-width: 768px) {
        @keyframes shrink {
            from {
                height: 100dvh;
            }

            to {
                height: calc(100dvh - 360px);
            }
    }

        @keyframes grow {
            from {
                height: calc(100dvh - 360px);
            }

            to {
                height: 100dvh;
            }
        }
    }
    `
    ;

// Component
export class MapComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _map!: Map;
    private _markers: Marker[] = [];
    private _isMinimal: boolean = false;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style.cloneNode(true));

        const maplibreStyleSheet: CSSStyleSheet = new CSSStyleSheet();
        maplibreStyleSheet.replaceSync(maplibreStyle);
        this.shadowRoot.adoptedStyleSheets.push(maplibreStyleSheet);
    }

    public get map(): Map { return this._map }

    public get markers(): Marker[] { return this._markers }
    public set markers(value: Marker[]) { this._markers = value }

    public get isMinimal(): boolean { return this._isMinimal }
    public set isMinimal(value: boolean) {
        this._isMinimal = value;
        this._toggleMinimal(value);
    }

    // Component callbacks
    public connectedCallback(): void {
        this._render();
        this._setup();
    }

    public disconnectedCallback(): void {
    }

    static observedAttributes: string[] = [];
    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {

    }

    // Methods
    private _render(): void {
        this._initMap();
    }

    private _setup(): void {
    }

    // Map initialization
    private _initMap(): void {
        const container: HTMLDivElement | null = this.shadowRoot.querySelector('#map');
        if (!container) return;

        this._map = new Map({
            container,
            center: [8.9347, 44.4071],
            // style: 'https://tiles.openfreemap.org/styles/liberty',
            style: './settings/map-light.json',
            zoom: 13,
            attributionControl: false
        });

        this._addControls();
        this._map.on('load', () => {
            this.dispatchEvent(new CustomEvent('map-loaded', { bubbles: true, composed: true }));
            this._addTerrainLayer();
        });
        this._map.on('mousemove', (event: MapMouseEvent) => {
            const features: MapGeoJSONFeature[] = this._getClickedFeatures(event, 'protomaps');
            features.length > 0 ? this._map.getCanvas().style.cursor = 'pointer' : this._map.getCanvas().style.cursor = '';
        });
        this._map.on('click', (event: MapMouseEvent) => this._handleClick(event));
    }

    private _addControls(): void {
        this.map.addControl(new AttributionControl(), 'bottom-left');

        this.map.addControl(new GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true,
            showAccuracyCircle: false,
            showUserLocation: true
        })
            .on('geolocate', (event: GeolocationPosition) => this.dispatchEvent(new CustomEvent('position-updated', { bubbles: true, composed: true, detail: { position: event } })))
            , 'bottom-right');

        this.map.addControl(new NavigationControl({
            visualizePitch: true,
            showCompass: true,
            showZoom: false
        }), 'bottom-right');

        this.map.addControl(new MapTerrainControl(), 'bottom-right');
        this.map.addControl(new PointsCloudControl(), 'bottom-right');
    }

    private _toggleMinimal(value: boolean): void {
        const map: HTMLDivElement | null = this.shadowRoot.querySelector('#map');
        if (map) value ? map.classList.add('map--minimal') : map.classList.remove('map--minimal');
    }

    // Adding / removing layers
    public isLayerOnMap(id: string): boolean {
        return (
            this.map.getLayer(`${id}_circle`) ||
            this.map.getLayer(`${id}_fill`) ||
            this.map.getLayer(`${id}_line`)
        ) ? true : false;
    }

    public addGeoJsonToMap(geoJSON: any, id: string, color: string): void {      
        if (!this.map.getSource(id)) this.map.addSource(id, { type: 'geojson', data: geoJSON });
        this._createCircleLayer(id, color);
        this._createLineLayer(id, color);
        this._createFillLayer(id, color);
    }

    public removeLayerFromMap(id: string): void {
        if (this.map.getLayer(`${id}_circle`)) this.map.removeLayer(`${id}_circle`);
        if (this.map.getLayer(`${id}_line`)) this.map.removeLayer(`${id}_line`);
        if (this.map.getLayer(`${id}_fill`)) this.map.removeLayer(`${id}_fill`);
        if (this.map.getImage(id)) this.map.removeImage(id);
        if (this.map.getSource(id)) this.map.removeSource(id);
    }

    private _createCircleLayer(id: string, color: string): void {
        this.map.addLayer({
            id: id + '_circle',
            source: id,
            type: 'circle',
            paint: {
                "circle-radius": 4,
                "circle-color": color,
                "circle-opacity": .5,
                "circle-stroke-color": color,
                "circle-stroke-opacity": 1,
                "circle-stroke-width": 2
            },
            filter: ['==', ['geometry-type'], 'Point']
        });
    }

    private _createLineLayer(id: string, color: string): void {
        this.map.addLayer({
            id: id + '_line',
            source: id,
            type: 'line',
            paint: {
                "line-color": color,
                "line-width": 4
            },
            filter: ['==', ['geometry-type'], 'LineString']
        }, 'buildings');
    }

    private _createFillLayer(id: string, color: string): void {
        this.map.addLayer({
            id: id + '_fill',
            source: id,
            type: 'fill',
            paint: {
                "fill-color": color,
                "fill-opacity": .5,
                "fill-outline-color": color
            },
            filter: ['==', ['geometry-type'], 'Polygon']
        }, 'buildings');
    }

    private _addTerrainLayer(): void {
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
        }).catch(error => {
            console.error('Error loading PMTiles header:', error);
        });
    }

    // Click
    private async _handleClick(event: MapMouseEvent) {
        this.dispatchEvent(new CustomEvent('empty-searchbar'));
        const features: MapGeoJSONFeature[] = this._getClickedFeatures(event, 'protomaps');

        if (this._isMarkerOnMap('selected-feature')) {           
            const markers: Marker[] = this.getMarker('selected-feature');
            markers.forEach((marker: Marker) => {
                this.markers = this.removeMarker('selected-feature');
                marker.remove();
            });
        }

        if (this._isMarkerOnMap('custom-path')) {           
            const markers: Marker[] = this.getMarker('custom-path');
            markers.forEach((marker: Marker) => {
                this.markers = this.removeMarker('custom-path');
                marker.remove();
            });
        }

        this.removeLayerFromMap('selected-feature');  

        if (features.length === 0) {
            const marker: Marker | null = await this.createCustomMarker('./images/pin.svg', 'selected-feature', '#EA4335', '#B31412');
            if (marker) this.addMarker(marker, event.lngLat);
        } else {
            const feature: MapGeoJSONFeature = features[0];
            if (feature.geometry.type === 'Point') {
                const marker: Marker | null = await this.createCustomMarker('./images/pin.svg', 'selected-feature', '#EA4335', '#B31412');
                if (marker) this.addMarker(marker, new LngLat(feature.geometry.coordinates[0], feature.geometry.coordinates[1]));
            } else {
                const geoJSON: any = this._createGeoJsonFromFeature(feature);
                this.addGeoJsonToMap(geoJSON, 'selected-feature', '#1152F7');
            }
        }
       
        this.dispatchEvent(new CustomEvent('map-click', { bubbles: true, composed: true, detail: { lngLat: event.lngLat, features: features.length === 0 ? [] : [features[0]] } }));
    }

    private _getClickedFeatures(event: MapMouseEvent, baseLayerSource: string) {
        return this.map.queryRenderedFeatures(event.point).filter((feature: MapGeoJSONFeature) => feature.source !== baseLayerSource);
    }

    // Marker
    private _isMarkerOnMap(id: string): boolean {      
        const allMarkers: HTMLElement[] = this.markers.map((marker: Marker) => marker.getElement());
        const foundMarker: HTMLElement | undefined = allMarkers.find((element: HTMLElement) => element.classList.contains(id));       
        return foundMarker ? true : false;
    }

    public addMarker(marker: Marker, lngLat: LngLat): void {
        this.markers.push(marker);
        marker.setLngLat(lngLat).addTo(this.map);
    }

    public getMarker(id: string): Marker[] {
        const foundMarker: Marker[] = this.markers.filter((marker: Marker) => {
            const el: HTMLElement = marker.getElement();
            return el.classList.contains(id);
        });
        return foundMarker || [];
    }

    public removeMarker(id: string) {
        return this.markers.filter((marker: Marker) => {
            const el: HTMLElement = marker.getElement();
            return !el.classList.contains(id);
        });
    }

    public async createCustomMarker(iconUrl: string, className: string, primaryColor: string, secondaryColor: string): Promise<Marker | null> {
        try {
            const iconText: string | null = await this._fetchPinIcon(iconUrl);
            if (!iconText) return null;

            const div: HTMLDivElement = document.createElement('div');
            div.style.height = '32px';
            div.style.width = '32px';
            div.id = className;
            div.innerHTML = iconText;

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

    private async _fetchPinIcon(url: string): Promise<string | null> {
        try {
            const res: Response = await fetch(url);
            if (!res.ok) {
                throw new Error('Errore nel recupero dell\'icona');
            }
            const text: string = await res.text();
            return text;
        } catch (error) {
            console.error('Errore nel recupero dell\'icona');
            return null;
        }
    }

    private _createGeoJsonFromFeature(feature: MapGeoJSONFeature) {
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

    // Camera
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
}

customElements.define('app-map', MapComponent);