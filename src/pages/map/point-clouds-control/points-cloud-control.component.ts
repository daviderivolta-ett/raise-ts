import { ControlPosition, IControl, Map } from 'maplibre-gl';
import { Tile3DLayer } from 'deck.gl';
import { MapboxOverlay } from '@deck.gl/mapbox';

export class PointsCloudControl implements IControl {
    private container: HTMLElement | null = null;
    private areCloudsActive: boolean = false;
    private _deckOverlay: MapboxOverlay | null = null;

    onAdd(map: Map): HTMLElement {
        this.container = document.createElement('div');
        this.container.classList.add('maplibregl-ctrl', 'maplibregl-ctrl-group');
        const button: HTMLButtonElement = document.createElement('button');
        button.innerHTML = `<span class="material-symbols-outlined">view_in_ar</span>`;
        button.addEventListener('click', () => {
            this.areCloudsActive = !this.areCloudsActive;
            this.areCloudsActive ? button.classList.add('active') : button.classList.remove('active');
            this.toggleClouds(map, this.areCloudsActive);
        });

        this.container.appendChild(button);

        this.addPointsCloudLayers();

        return this.container;
    }

    onRemove(map: Map): void {
        if (this.areCloudsActive) {
            this.toggleClouds(map, false);
        }
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.container = null;
    }

    private toggleClouds(map: Map, areCloudsActive: boolean) {
        if (areCloudsActive) {
            this.addPointsCloudLayers();
            if (this._deckOverlay) {
                map.addControl(this._deckOverlay);
            }
        } else {
            if (this._deckOverlay) {
                map.removeControl(this._deckOverlay);
            }
            this._deckOverlay = null;
        }
    }

    private addPointsCloudLayers(): void {
        const tile3dLayer: Tile3DLayer = new Tile3DLayer({
            id: 'tile-3d-layer',
            data: './point-clouds/nuvola_punti_genova_porto/tileset.json',
            // data: './point-clouds/ischia_dtm/tileset.json',
            pointSize: .5,
            opacity: .5
        });

        this._deckOverlay = new MapboxOverlay({
            id: 'deck-overlay',
            interleaved: true,
            layers: [tile3dLayer]
        });
    }

    getDefaultPosition?: (() => ControlPosition) | undefined;
}