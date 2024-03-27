import { MyColor } from '../../../models/color.model';
import { Layer } from '../../../models/layer.model';
import { EventObservable } from '../../../observables/event.observable';
import { MapService } from '../../../services/map.service';

export class CarouselChipComponent extends HTMLButtonElement {
    private _layer: Layer = Layer.createEmpty();
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

        this.legend = this.querySelector('.legend') as HTMLSpanElement;
        this.legend.style.backgroundColor = MyColor.rgbToRgba(MyColor.hexToRgb(this._layer.style.color), 0.5);
        this.legend.style.borderColor = this._layer.style.color;

        this.removeIcon = this.querySelector('.icon') as HTMLSpanElement;
    }

    private setup(): void {
        this.removeIcon.addEventListener('click', () => {
            MapService.instance.benchLayer(this.layer);
            EventObservable.instance.publish('open-bench', true);
        });
    }
}

customElements.define('app-carousel-chip', CarouselChipComponent, { extends: 'button' });