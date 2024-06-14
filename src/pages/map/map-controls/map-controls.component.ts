import { SidenavStatus } from '../../../models/sidenav.model';
import { EventObservable } from '../../../observables/event.observable';

import style from './map-controls.component.scss?raw';

export class MapControlsComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _isOpen: boolean = false;

    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        let sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    set isOpen(isOpen: boolean) {
        this._isOpen = isOpen;
        this.isOpen === true ? this.classList.add('open') : this.classList.remove('open');
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <button is="app-map-type-btn" class="fa-button map-controls">
                <span class="icon">
                    <span class="material-symbols-outlined">map</span>
                </span>
            </button>
            <button is="app-map-mode-btn" class="fa-button map-controls">
                <span class="icon">
                    <span class="material-symbols-outlined">view_in_ar</span>
                </span>
            </button>
            <button is="app-center-position-btn" class="fa-button map-controls">
                <span class="icon">
                    <span class="material-symbols-outlined">my_location</span>
                </span>
            </button>
            `
            ;
    }

    private setup(): void {
        EventObservable.instance.subscribe('sidenav-status-change', (status: SidenavStatus) => {
            status === 0 ? this.isOpen = false : this.isOpen = true;
        });
    }

    public disconnectedCallback(): void {
        EventObservable.instance.unsubscribeAll('sidenav-status-change');
    }
}

customElements.define('app-map-controls', MapControlsComponent);