import { MapService } from '../../../services/map.service';

export class MapThemeBtnComponent extends HTMLButtonElement {
    constructor() {
        super();
    }

    public connectedCallback(): void {
        this.setup();
    }

    private setup(): void {
        this.addEventListener('click', () => {
            MapService.instance.currentTheme++;           
            if (MapService.instance.currentTheme >= MapService.instance.mapThemes.length) MapService.instance.currentTheme = 0;
            MapService.instance.changeTheme(MapService.instance.currentTheme);
        });
    }
}

customElements.define('app-map-theme-btn', MapThemeBtnComponent, { extends: 'button' });