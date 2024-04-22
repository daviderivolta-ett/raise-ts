import { Path } from '../../../models/path.model';
import { PointOfInterest } from '../../../models/poi.model';
import { Tab } from '../../../models/tab.model';
import { TabsObservable } from '../../../observables/tabs.observable';
import { StorageService } from '../../../services/storage.service';
import { SelectedSuggestedPathCardComponent } from '../selected-suggested-path-card/selected-suggested-path-card.component';

import style from '../custom-path-panel/custom-path-panel.component.scss?raw';

export class SelectedSuggestedPathPanelComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _path: Path = { ...StorageService.instance.selectedSuggestedPath };

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        const sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
    }

    public get path(): Path {
        return this._path;
    }

    public set path(path: Path) {
        this._path = path;
        this.connectedCallback();
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
        this.update()
    }

    public render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="header">
                <h4>${this.path.name}</h4>
                <button class="btn back-btn">
                    <span class="material-symbols-outlined action-icon">chevron_left</span>
                </button>
            </div>
            <div class="list"></div>
            `
            ;
    }

    private setup(): void {
        const backBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.back-btn');
        if (backBtn) backBtn.addEventListener('click', () => {
            TabsObservable.instance.isSuggestedPathSelected = false;
            TabsObservable.instance.currentTab = Tab.SuggestedPath;
        });
    }

    private update(): void {
        const list: HTMLDivElement | null = this.shadowRoot.querySelector('.list');
        if (!list) return;
        list.innerHTML = '';
        this.path.pois.forEach((poi: PointOfInterest) => {
            let card: SelectedSuggestedPathCardComponent = new SelectedSuggestedPathCardComponent();
            card.poi = poi;
            list.appendChild(card);
        })
    }
}

customElements.define('app-selected-suggested-path-panel', SelectedSuggestedPathPanelComponent);