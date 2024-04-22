import { Path } from '../../../models/path.model';
import { TabsObservable } from '../../../observables/tabs.observable';
import { StorageService } from '../../../services/storage.service';

import style from './suggested-path-card.component.scss?raw';

export class SuggestedPathCardComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _path: Path = Path.createEmpty();
    private _template: HTMLTemplateElement = document.createElement('template');

    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        const sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);

        this._template.id = 'app-suggested-path-card';
        this._template.innerHTML =
            `
            <h4 class="path-title"><slot name="path-name">Nome del percorso</slot></h4>
            <p class="path-steps"><slot name="pois-count">Numero di tappe</slot>&nbsp;tappe</p>
            `
        this.shadowRoot.appendChild(this._template.content.cloneNode(true))
    }

    public get path(): Path {
        return this._path;
    }

    public set path(path: Path) {
        this._path = path;
        this.update();
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void { }

    private setup(): void {
        this.addEventListener('click', () => {
            TabsObservable.instance.isSuggestedPathSelected = true;
            StorageService.instance.selectedSuggestedPath = this.path;
        });
    }

    private update(): void {
        if (!this.path) return;

        this.innerHTML =
            `
            <h4 slot="path-name">${this.path.name}</h4>
            <p slot="pois-count">${this.path.pois.length}</p>
            `
            ;
    }
}

customElements.define('app-suggested-path-card', SuggestedPathCardComponent);