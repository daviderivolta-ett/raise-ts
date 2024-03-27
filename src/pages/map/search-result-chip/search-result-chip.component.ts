import { MyColor } from '../../../models/color.model';
import { Layer } from '../../../models/layer.model';

import { EventObservable } from '../../../observables/event.observable';

export class SearchResultChipComponent extends HTMLButtonElement {
    private _layer: Layer = Layer.createEmpty();
    public legend: HTMLSpanElement = document.createElement('span');

    constructor() {
        super();
    }

    get layer(): Layer {
        return this._layer;
    }

    set layer(layer: Layer) {
        this._layer = layer;
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
                <span class="material-symbols-outlined">add</span>
            </span>
            `
            ;

        this.legend = this.querySelector('.legend') as HTMLSpanElement;
        this.legend.style.backgroundColor = MyColor.rgbToRgba(MyColor.hexToRgb(this._layer.style.color), 0.5);
        this.legend.style.borderColor = this._layer.style.color;
    }

    private setup(): void {
        this.addEventListener('click', () => {
            EventObservable.instance.publish('add-layer', this.layer);
        });
    }
}

customElements.define('app-search-result-chip', SearchResultChipComponent, { extends: 'button' });