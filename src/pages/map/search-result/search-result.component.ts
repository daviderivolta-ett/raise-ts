import { Layer } from '../../../models/layer.model';
import { EventObservable } from '../../../observables/event.observable';
import { SearchResultChipComponent } from '../search-result-chip/search-result-chip.component';
import { LayerSearchResult } from '../searchbar/searchbar.component';

import style from './search-result.component.scss?raw';
import chipStyle from '../search-result-chip/search-result-chip.component.scss?raw';

export class SearchResultComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private container: HTMLDivElement = document.createElement('div');
    private _layers: Layer[] = [];
    private _isVisible: boolean = false;

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

    get isVisible(): boolean {
        return this._isVisible;
    }

    set isVisible(isVisible: boolean) {
        this._isVisible = isVisible;
        this._isVisible === true ? this.classList.add('visible') : this.classList.remove('visible');
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.container.classList.add('container');
        this.shadowRoot.append(this.container);
    }

    private setup(): void {
        EventObservable.instance.subscribe('search-layer', (searchResult: LayerSearchResult) => {
            this.container.innerHTML = '';

            if (searchResult.searchValue === '') {
                this.isVisible = false;
                return;
            }

            this.isVisible = true;
            this.layers = searchResult.layers;
        });
    }

    private update(): void {
        if (this._layers.length === 0) {
            let emptyMsg: HTMLParagraphElement = document.createElement('p');
            emptyMsg.innerHTML = 'Nessun livello trovato';
            this.container.append(emptyMsg);
            return;
        }

        this._layers.forEach((layer: Layer) => {
            let chip: SearchResultChipComponent = new SearchResultChipComponent();
            chip.layer = layer;
            chip.setAttribute('is', 'app-search-result-chip');
            this.container.append(chip);
        });
    }
}

customElements.define('app-search-result', SearchResultComponent);