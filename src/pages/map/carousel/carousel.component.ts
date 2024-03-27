import { Layer } from '../../../models/layer.model';

import { EventObservable } from '../../../observables/event.observable';
import { StorageService } from '../../../services/storage.service';

import { CarouselChipComponent } from '../carousel-chip/carousel-chip.component';

import style from './carousel.component.scss?raw';
import chipStyle from '../carousel-chip/carousel-chip.component.scss?raw';

export class CarouselComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _layers: Layer[] = StorageService.instance.layers.active;

    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        let sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);

        let chipSheet: CSSStyleSheet = new CSSStyleSheet();
        chipSheet.replaceSync(chipStyle);

        this.shadowRoot.adoptedStyleSheets = [sheet, chipSheet];
    }

    get layers(): Layer[] {
        return this._layers;
    }

    set layers(layers: Layer[]) {
        this._layers = layers;
        this.update();
    }

    public connectedCallback(): void {
        this.setup();
        if (this.layers.length !== 0) this.update();
    }

    private setup(): void {
        EventObservable.instance.subscribe('active-layers-updated', (layers: Layer[]) => {
            this.layers = [...layers];
        });
    }

    private update(): void {
        this.shadowRoot.innerHTML = '';
        this.layers.forEach((layer: Layer) => {
            let chip: CarouselChipComponent = new CarouselChipComponent();
            chip.layer = layer;
            chip.setAttribute('is', 'app-carousel-chip');
            this.shadowRoot.append(chip);
        });
    }
}

customElements.define('app-carousel', CarouselComponent);