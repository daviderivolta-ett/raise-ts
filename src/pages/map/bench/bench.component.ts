import { Layer } from '../../../models/layer.model';

import { EventObservable } from '../../../observables/event.observable';
import { StorageService } from '../../../services/storage.service';

import { BenchChipComponent } from '../bench-chip/bench-chip.component';

import style from './bench.component.scss?raw';
import chipStyle from '../bench-chip/bench-chip.component.scss?raw';

export class BenchComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _isVisible: boolean = false;
    private _layers: Layer[] = [];

    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        let sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);

        let chipSheet: CSSStyleSheet = new CSSStyleSheet();
        chipSheet.replaceSync(chipStyle);

        this.shadowRoot.adoptedStyleSheets = [sheet, chipSheet];
    }

    get isVisible(): boolean {
        return this._isVisible;
    }

    set isVisible(isVisible: boolean) {
        this._isVisible = isVisible;
        this.toggleBench();
    }

    get layers(): Layer[] {
        return this._layers;
    }

    set layers(layers: Layer[]) {
        this._layers = layers;
        this.update();
    }

    public connectedCallback(): void {     
        this.render();
        this.setup();
    }

    private render(): void {
        this.layers = StorageService.instance.benchLayers;
    }

    private setup(): void {
        EventObservable.instance.subscribe('bench-layers-updated', (layers: Layer[]) => {
            this.layers = [...layers];
        });

        EventObservable.instance.subscribe('toggle-bench', (isOpen: boolean) => {
            this.isVisible = isOpen;
        });
    }

    private update(): void {
        this.shadowRoot.innerHTML = '';
        this.layers.forEach((layer: Layer) => {
            let chip: BenchChipComponent = new BenchChipComponent();
            chip.layer = layer;
            chip.setAttribute('is', 'app-bench-chip');
            this.shadowRoot.append(chip);
        });
    }

    private toggleBench(): void {
        this.isVisible === true ? this.classList.add('visible') : this.classList.remove('visible');
    }
}

customElements.define('app-bench', BenchComponent);