import { EventObservable } from '../../../observables/event.observable';
import { ThemeService } from '../../../services/theme.service';

export class MapTypeBtnComponent extends HTMLButtonElement {
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
        this.addEventListener('click', () => ThemeService.instance.togglePhysicalMap());

        EventObservable.instance.subscribe('toggle-tabs', (isOpen: boolean) => {
            this.isOpen = isOpen;
        });
    }
}

customElements.define('app-map-type-btn', MapTypeBtnComponent, { extends: 'button' });