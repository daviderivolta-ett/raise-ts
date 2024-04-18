import { Path } from '../../../models/path.model';

import style from './suggested-path-card.component.scss?raw';

export class SuggestedPathCardComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _path: Path | null = null;
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
            <h4><slot name="path-name">Nome del percorso</slot></h4>
            <p>Numero tappe: <slot name="pois-count">Numero di tappe</slot></p>
            `
        this.shadowRoot.appendChild(this._template.content.cloneNode(true))
    }

    public get path(): Path | null {
        return this._path;
    }

    public set path(path: Path | null) {
        this._path = path;
        this.update();
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void { }

    private update(): void {
        if (!this.path) return;
        
        this.innerHTML =
            `
            <h4 slot="path-name">${this.path.name}</h4>
            <p slot="pois-count">${this.path.pois.length}</p>
            `
            ;
    }

    private setup(): void {
        this.addEventListener('click', () => console.log('click'));
    }
}

customElements.define('app-suggested-path-card', SuggestedPathCardComponent);