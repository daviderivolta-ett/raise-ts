import style from './splash.component.scss?raw';

export class SplashComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        const sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
    }

    public connectedCallback(): void {
        this.render();
    }

    private render(): void {
        this.shadowRoot.innerHTML = 
            `
            <img src="./images/RAISE_pictogram_no_bg.svg" class="logo">
            <div class="loader"></div>
            `
            ;
    }
}

customElements.define('app-splash', SplashComponent);