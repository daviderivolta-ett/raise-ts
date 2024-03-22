import { Layer } from '../../../models/Layer.model';
import { EventObservable } from '../../../observables/event.observable';
import { DataService } from '../../../services/data.service';

export interface LayerSearchResult {
    layers: Layer[];
    searchValue: string;
}

export class SearchbarComponent extends HTMLInputElement {
    constructor() {
        super();
    }

    public connectedCallback(): void {
        this.setup();
    }

    private setup(): void {
        this.addEventListener('input', () => {
            let layerSearchResult: LayerSearchResult = { layers: [], searchValue: '' };
            if (this.value === '') {
                EventObservable.instance.publish('search-layer', layerSearchResult);
            } else {
                const filteredLayers: Layer[] = DataService._instance.filterLayersByNameAndTag(DataService._instance.data, this.value);
                layerSearchResult = { layers: filteredLayers, searchValue: this.value };
                EventObservable.instance.publish('search-layer', layerSearchResult);
            }
        });
    }
}

customElements.define('app-searchbar', SearchbarComponent, { extends: 'input' });