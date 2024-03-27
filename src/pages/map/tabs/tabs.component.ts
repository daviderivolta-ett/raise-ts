import { Tab } from '../../../models/tab.model';
import { EventObservable } from '../../../observables/event.observable';

import style from './tabs.component.scss?raw';

export class TabsComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _currentTab: Tab = Tab.Info;
    private infoTab: HTMLButtonElement | null = null;
    private suggestedRouteTab: HTMLButtonElement | null = null;
    private customRouteTab: HTMLButtonElement | null = null;
    private panel: HTMLDivElement | null = null;

    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        let sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
    }

    public get currentTab(): Tab {
        return this._currentTab;
    }

    public set currentTab(currentTab: Tab) {
        this._currentTab = currentTab;
        this.switchTab();
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
        this.currentTab = Tab.Info;
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <nav class="header">
                <button class="tab info-tab">Info</button>
                <button class="tab suggested-route-tab">Percorsi suggeriti</button>
                <button class="tab custom-route-tab">Percorsi custom</button>
            </nav>
            <div class="panel"></div>
            `
            ;

        this.infoTab = this.shadowRoot.querySelector('.info-tab') as HTMLButtonElement;
        this.suggestedRouteTab = this.shadowRoot.querySelector('.suggested-route-tab') as HTMLButtonElement;
        this.customRouteTab = this.shadowRoot.querySelector('.custom-route-tab') as HTMLButtonElement;
        this.panel = this.shadowRoot.querySelector('.panel') as HTMLDivElement;
    }

    private setup(): void {
        if (this.infoTab) this.infoTab.addEventListener('click', () => this.currentTab = Tab.Info);
        if (this.suggestedRouteTab) this.suggestedRouteTab.addEventListener('click', () => this.currentTab = Tab.SuggestedPath);
        if (this.customRouteTab) this.customRouteTab.addEventListener('click', () => this.currentTab = Tab.CustomPath);

        EventObservable.instance.subscribe('current-tab-updated', (tab: Tab) => this.currentTab = tab);
    }

    private renderInfoPanel(): void {
        if (!this.panel) return;
        this.panel.innerHTML = '';
        this.panel.innerHTML = '<app-info-panel></app-info-panel>';
    }

    private renderSuggestedRoutePanel(): void {
        if (!this.panel) return;
        this.panel.innerHTML = '';
        this.panel.innerHTML = '<p>SUGGESTED PATH</p>';
    }

    private renderCustomPathPanel(): void {
        if (!this.panel) return;
        this.panel.innerHTML = '';
        this.panel.innerHTML = '<app-custom-path-panel></app-custom-path-panel>';
    }

    private switchTab(): void {
        switch (this.currentTab) {
            case Tab.CustomPath:
                this.renderCustomPathPanel();
                break;

            case Tab.SuggestedPath:
                this.renderSuggestedRoutePanel();
                break;
        
            default:
                this.renderInfoPanel();
                break;
        }
    }
}

customElements.define('app-tabs', TabsComponent)