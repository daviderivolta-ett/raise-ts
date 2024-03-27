import { EventObservable } from '../../../observables/event.observable';
import { MapService } from '../../../services/map.service';

export class MapModeButtonComponent extends HTMLButtonElement {
    private _isOpen: boolean = false;

    constructor() {
        super();
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    set isOpen(isOpen: boolean) {
        this._isOpen = isOpen;
        this.isOpen === true ? this.classList.add('open') : this.classList.remove('open');
    }

    public connectedCallback(): void {
        this.setup();
    }

    private setup(): void {
        this.addEventListener('click', () => EventObservable.instance.publish('change-map-mode', null));

        EventObservable.instance.subscribe('toggle-tabs', (isOpen: boolean) => {
            this.isOpen = isOpen;
        });
    }

}

customElements.define('app-map-mode-btn', MapModeButtonComponent, { extends: 'button' });