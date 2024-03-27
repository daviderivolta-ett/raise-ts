import { SnackbarType } from '../../models/snackbar-type.model';

import style from './snackbar.component.scss?raw';

export class SnackbarComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    public snackbarType: SnackbarType = SnackbarType.Info;
    public message: string = '';
    public duration: number = 0;

    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        let sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
    }

    public connectedCallback(): void {
        this.render();
    }

    private render(): void {
        this.shadowRoot.innerHTML = `<p class="message">${this.message}</p>`;

        switch (this.snackbarType) {
            case SnackbarType.Error:
                this.renderErrorSnackbar();
                break;

            case SnackbarType.Loader:
                this.renderLoaderSnackbar();
                break;

            case SnackbarType.Temporary:
                this.renderTemporarySnackbar();
                break;

            default:
                this.renderInfoSnackbar();
                break;
        }
    }

    private renderInfoSnackbar(): void {
        this.createDismissButton();
    }

    private renderLoaderSnackbar(): void {
        const loadingIcon: HTMLDivElement = document.createElement('div');
        loadingIcon.classList.add('loader')
        this.shadowRoot.append(loadingIcon);
    }

    private renderErrorSnackbar(): void {
        this.createDismissButton();
    }

    private renderTemporarySnackbar(): void {
        this.createDismissButton();
        const bar: HTMLSpanElement = document.createElement('span')
        bar.classList.add('bar');
        bar.style.setProperty('--snackbar-duration', `${this.duration}s`);
        this.shadowRoot.append(bar);
        setTimeout(() => this.remove(), this.duration * 1000);
    }

    private createDismissButton(): void {
        const dismissButton: HTMLButtonElement = document.createElement('button');
        dismissButton.innerHTML = `<span class="material-symbols-outlined">close</span>`;
        this.shadowRoot.append(dismissButton);
        dismissButton.addEventListener('click', () => this.remove());
    }
}

customElements.define('app-snackbar', SnackbarComponent);