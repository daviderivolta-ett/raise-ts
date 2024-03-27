import { MyColor } from '../../../models/color.model';
import { Layer } from '../../../models/layer.model';
import { MapService } from '../../../services/map.service';

export class BenchChipComponent extends HTMLButtonElement {
    private _layer: Layer = Layer.createEmpty();
    public info: HTMLDivElement = document.createElement('div');
    public legend: HTMLSpanElement = document.createElement('span');
    public removeIcon: HTMLSpanElement = document.createElement('span');

    constructor() {
        super();
    }

    get layer(): Layer {
        return this._layer;
    }

    set layer(layers: Layer) {
        this._layer = layers;
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.innerHTML =
            `
            <div class="info">
                <span class="legend"></span>
                <label>${this.layer.name}</label>
            </div>
            <span class="icon add-icon">
                <span class="material-symbols-outlined">delete</span>
            </span>
            `
            ;

        this.info = this.querySelector('.info') as HTMLDivElement;

        this.legend = this.querySelector('.legend') as HTMLSpanElement;
        this.legend.style.backgroundColor = MyColor.rgbToRgba(MyColor.hexToRgb(this._layer.style.color), 0.5);
        this.legend.style.borderColor = this._layer.style.color;

        this.removeIcon = this.querySelector('.icon') as HTMLSpanElement;
    }

    private setup(): void {
        this.addEventListener('click', () => {
            MapService.instance.unbenchLayer(this.layer);
        });

        this.removeIcon.addEventListener('click', (e: Event) => {
            e.stopPropagation();
            MapService.instance.removeLayerFromBench(this.layer);
        });
    }
}

customElements.define('app-bench-chip', BenchChipComponent, { extends: 'button' });