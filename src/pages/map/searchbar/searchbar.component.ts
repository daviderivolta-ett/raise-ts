import { Layer } from '../../../models/layer.model';
import { EventObservable } from '../../../observables/event.observable';
import { DataService } from '../../../services/data.service';

export interface LayerSearchResult {
    layers: Layer[];
    searchValue: string;
}

export class SearchbarComponent extends HTMLInputElement {
    private _inputValue: string = '';

    constructor() {
        super();
    }

    public get inputValue(): string {
        return this._inputValue;
    }

    public set inputValue(inputValue: string) {
        this._inputValue = inputValue;
        this.update();
    }

    public connectedCallback(): void {
        this.setup();
    }

    private setup(): void {
        this.addEventListener('input', () => this.inputValue = this.value);
        EventObservable.instance.subscribe('empty-searchbar', () => this.value = this.inputValue = '');
    }

    private update(): void {
        let layerSearchResult: LayerSearchResult = { layers: [], searchValue: '' };
        if (this.inputValue === '') {
            EventObservable.instance.publish('search-layer', layerSearchResult);
        } else {
            const filteredLayers: Layer[] = DataService.instance.filterLayersByNameAndTag(DataService.instance.data, this.value.toLowerCase());
            layerSearchResult = { layers: filteredLayers, searchValue: this.inputValue };
            EventObservable.instance.publish('search-layer', layerSearchResult);
        }
    }

    public disconnectedCallback(): void {
        EventObservable.instance.unsubscribeAll('empty-searchbar');
    }
}

customElements.define('app-searchbar', SearchbarComponent, { extends: 'input' });