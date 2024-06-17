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
        let scheme: 'dark' | 'light' = this.chooseLogoColor();        
        this.render(scheme);
    }

    private render(scheme: 'dark' | 'light'): void {
        this.shadowRoot.innerHTML =
            `
            <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="logo">
                <defs>
                    <style>
                    .cls-1 {
                        fill: #dc281e;
                    }

                    .cls-2 {
                        fill: #fff;
                    }

                    .cls-1, .cls-2 {
                        stroke-width: 0px;
                    }
                    </style>
                </defs>
                <circle class="cls-1" cx="153.56" cy="411.42" r="44.58"/>
                <path class="cls-2" d="m304.7,292.74c89.16-18.32,96.08-89.57,96.08-111.04-.1-84.58-53.84-125.7-164.48-125.7h-121.22l29.52,61.88h90.18c35.93,0,60.46,7.12,74.91,21.58,9.67,9.77,14.55,23,14.35,39.29-.31,25.45-14.25,42.75-41.53,51.6-22.39,7.23-49.47,7.02-63,6.92l-1.32,59.13,101.58,153.28h83.26l-101.17-156.34,2.85-.61h-.01Z"/>
            </svg>
            <div class="loader"></div>
            `
            ;

        const logo: SVGElement | null = this.shadowRoot.querySelector('svg');
        if (!logo) return;
        const element: SVGElement | null = logo.querySelector('.cls-2');
        if (!element) return;
        scheme === 'dark' ? element.style.fill = '#fff' : element.style.fill = '#0A0B29';
    }

    private chooseLogoColor(): 'dark' | 'light' {
        return document.body.classList.contains('dark') ? 'dark' : 'light';
    }
}

customElements.define('app-splash', SplashComponent);