import { Layer } from '../../../models/layer.model';

import { EventObservable } from '../../../observables/event.observable';
import { StorageService } from '../../../services/storage.service';

import { CarouselChipComponent } from '../carousel-chip/carousel-chip.component';

import style from './carousel.component.scss?raw';
import chipStyle from '../carousel-chip/carousel-chip.component.scss?raw';

export class CarouselComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _layers: Layer[] = [];
    public startX: number = 0;
    public dragScoll: number = 0;
    public isDragging: boolean = false;

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
        this.render();
        this.setup();
    }

    private render(): void {
        this.layers = StorageService.instance.activeLayers;     
    }

    private setup(): void {
        EventObservable.instance.subscribe('active-layers-updated', (layers: Layer[]) => {
            this.layers = [...layers];
        });

        this.addEventListener('mousedown', (e: MouseEvent) => this.startDrag(e));
        this.addEventListener('mousemove', (e: MouseEvent) => this.drag(e));
        this.addEventListener('mouseleave', () => this.endDrag());
        this.addEventListener('mouseup', () => this.endDrag());
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

    public disconnectedCallback(): void {
        EventObservable.instance.unsubscribeAll('active-layers-updated');
    }

    private startDrag(e: MouseEvent): void {
        this.isDragging = true; 
        this.startX = e.pageX;
        this.dragScoll = this.scrollLeft;
    }

    private endDrag(): void {
        this.isDragging = false;
    }

    private drag(e: MouseEvent): void {
        if (!this.isDragging) return;
        e.preventDefault();
        const deviation: number = e.pageX - this.startX;
        this.scrollLeft = this.dragScoll - deviation;  
    }
}

customElements.define('app-carousel', CarouselComponent);