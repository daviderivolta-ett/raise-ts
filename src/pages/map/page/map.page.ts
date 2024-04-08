import { Path } from '../../../models/path.model';
import { DataService } from '../../../services/data.service';
import { PositionService } from '../../../services/position.service';
import { StorageService } from '../../../services/storage.service';
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

        if (!StorageService.instance.paths.some((path: Path) => path.name === 'default')) StorageService.instance.saveNewPath('default');
        const selectedPath: Path | undefined = StorageService.instance.paths.find((path: Path) => path.lastSelected === true);
        if (selectedPath) StorageService.instance.selectedCustomPath = selectedPath;

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
                        <button class="fa-button tags-page-link">
                            <span class="icon">
                                <span class="material-symbols-outlined">apps</span>
                            </span>
                        </button>
                    </div>
                    <app-carousel></app-carousel>
                </div>
                <app-search-result></app-search-result>
                <app-map-controls></app-map-controls>
                <app-tabs-sidenav></app-tabs-sidenav>
                <app-bench></app-bench>
            </div>
            `
            ;

        this.map = this.shadowRoot.querySelector('app-map') as MapComponent;
    }

    private setup(): void {
        const link: HTMLButtonElement | null = this.shadowRoot.querySelector('.tags-page-link');
        if (!link) return;
        link.addEventListener('click', () => window.location.hash = '/');
    }
}

customElements.define('page-map', MapPage);