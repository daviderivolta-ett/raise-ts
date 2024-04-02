import { DataService } from '../../../services/data.service';
import { PositionService } from '../../../services/position.service';
import { ThemeService } from '../../../services/theme.service';
import { MapComponent } from '../map/map.component';

import style from './map.page.scss?raw';

export class MapPage extends HTMLElement {
    public shadowRoot: ShadowRoot;
    public map: MapComponent = new MapComponent();

    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'closed' });
        
        let sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
    }

    public async connectedCallback(): Promise<void> {
        await DataService.instance.getData();
        await ThemeService.instance.getMapThemes();
        await PositionService.instance.getUserPosition();

        this.render();
        this.setup();
    }

    private render(): void {
        // html
        this.shadowRoot.innerHTML =
            `
            <div class="page">
                <app-map></app-map>
                <div class="header">
                    <div class="search">
                        <button is="app-tabs-toggle" class="fa-button">
                            <span class="icon">
                                <span class="material-symbols-outlined">menu</span>
                            </span>
                        </button>
                        <input is="app-searchbar" type="text" placeholder="Cerca per livelli...">
                        <button is="app-bench-toggle" class="fa-button">
                            <span class="icon">
                                <span class="material-symbols-outlined">stacks</span>
                            </span>
                        </button>
                        <button is="app-map-theme-btn" class="fa-button">
                            <span class="icon">
                                <span class="material-symbols-outlined">contrast</span>
                            </span>
                        </button>
                    </div>
                    <app-carousel></app-carousel>
                </div>
                <app-search-result></app-search-result>
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
                <app-tabs-sidenav></app-tabs-sidenav>
                <app-bench></app-bench>
            </div>
            `
            ;

        this.map = this.shadowRoot.querySelector('app-map') as MapComponent;
    }

    private setup(): void { }
}

customElements.define('page-map', MapPage);