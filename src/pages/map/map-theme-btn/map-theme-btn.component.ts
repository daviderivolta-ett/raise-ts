import { ThemeService } from '../../../services/theme.service';

export class MapThemeBtnComponent extends HTMLButtonElement {
    constructor() {
        super();
    }

    public connectedCallback(): void {
        this.setup();
    }

    private setup(): void {
        this.addEventListener('click', () => ThemeService.instance.toggleTheme());
    }
}

customElements.define('app-map-theme-btn', MapThemeBtnComponent, { extends: 'button' });