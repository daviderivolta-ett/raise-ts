import { EventObservable } from '../../../observables/event.observable';
import style from './tabs-sidenav.component.scss?raw';

export class TabsSidenavComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _isVisible: boolean = false;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        let sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
    }

    get isVisible(): boolean {
        return this._isVisible;
    }

    set isVisible(isVisible: boolean) {
        this._isVisible = isVisible;
        this.update();
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML = '<app-tabs></app-tabs>';
    }

    private setup(): void {
        EventObservable.instance.subscribe('toggle-tabs', (isOpen: boolean) => {
            this.isVisible = isOpen;
        });
    }

    private update(): void {
        this.isVisible === true ? this.classList.add('visible') : this.classList.remove('visible');
    }
}

customElements.define('app-tabs-sidenav', TabsSidenavComponent);