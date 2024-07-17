import { ControlPosition, IControl, Map } from 'maplibre-gl';

export class MapTerrainControl implements IControl {
    private container: HTMLElement | null = null;
    private isTerrainActive: boolean = false;

    onAdd(map: Map): HTMLElement {
        this.container = document.createElement('div');
        this.container.classList.add('maplibregl-ctrl', 'maplibregl-ctrl-group');

        const button: HTMLButtonElement = document.createElement('button');
        button.innerHTML = `<span class="material-symbols-outlined">3d_rotation</span>`;
        button.addEventListener('click', () => {
            this.isTerrainActive = !this.isTerrainActive;
            this.isTerrainActive ? button.classList.add('active') : button.classList.remove('active');
            this.toggleTerrainLayer(map, this.isTerrainActive);
        });

        this.container.appendChild(button);

        return this.container;
    }

    onRemove(map: Map): void {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.container = null;
    }

    getDefaultPosition: (() => ControlPosition) | undefined;

    private toggleTerrainLayer(map: Map, isTerrainActive: boolean): void {
        const duration: number = 1000;

        if (isTerrainActive) {
            map.dragRotate.enable();
            map.easeTo({
                pitch: 60,
                duration,
                easing(t) {
                    return t < 0.5 ?
                        (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 :
                        (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
                },
                essential: true
            });
            map.setLayoutProperty('3d-buildings', 'visibility', 'visible');
            // setTimeout(() => map.setTerrain({ source: 'terrain', exaggeration: 2 }), duration * 2);
        } else {
            map.dragRotate.disable();
            map.easeTo({
                pitch: 0,
                bearing: 0,
                duration,
                easing(t) {
                    return t < 0.5 ?
                        (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 :
                        (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
                },
                essential: true
            });
            map.setLayoutProperty('3d-buildings', 'visibility', 'none');
            // setTimeout(() => map.setTerrain({ source: 'terrain', exaggeration: 0 }), duration * 2);
        }
    }
}