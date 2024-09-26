import { PointOfInterest } from '../../../models/poi.model';
import { EventObservable } from '../../../observables/event.observable';
import { MapService } from '../../../services/map.service';

export class DirectionsBtnComponent extends HTMLButtonElement {
    private _pois: PointOfInterest[] = [];
    private _mode: 'create' | 'delete' = 'create';

    constructor() {
        super();
    }

    public get pois(): PointOfInterest[] { return this._pois }
    public set pois(pois: PointOfInterest[]) {
        this._pois = pois;
    }

    public get mode(): 'create' | 'delete' { return this._mode }
    public set mode(value: 'create' | 'delete') {
        this._mode = value;
        this._removeEventListeners();
        this._addEventListeners(value);
    }

    public connectedCallback(): void {
        this._render();
    }

    static observedAttributes: string[] = ['btn-mode'];
    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (name === 'btn-mode' && (newValue === 'create' || newValue === 'delete')) {
            this.mode = newValue;
        }
    }

    // Methods
    private _render(): void {
        this._checkModeAttribute() ? null : this.setAttribute('btn-mode', 'create');
    }

    private _checkModeAttribute(): boolean {
        const attribute: string | null = this.getAttribute('btn-mode');
        return attribute ? true : false;
    }

    private _addEventListeners(mode: 'create' | 'delete'): void {
        if (mode === 'create') {
            this.addEventListener('click', this._createPath);
        } else {
            this.addEventListener('click', this._deletePath);
        }
    }

    private _removeEventListeners(): void {
        this.removeEventListener('click', this._createPath);
        this.removeEventListener('click', this._deletePath);
    }

    private _createPath = async (): Promise<void> => {
        MapService.instance.openGoogleMaps(this.pois);
    }

    private _deletePath = (): void => {
        EventObservable.instance.publish('remove-optimal-path', null);
    }

}

customElements.define('app-directions-btn', DirectionsBtnComponent, { extends: 'button' });