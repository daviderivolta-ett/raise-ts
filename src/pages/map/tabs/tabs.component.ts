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
        this.switchPanel();
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
                <button class="tab info-tab">Informazioni<span class="border"></span></button>
                <button class="tab suggested-route-tab">Percorsi suggeriti<span class="border"></span></button>
                <button class="tab custom-route-tab">Percorsi custom<span class="border"></span></button>
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

    public disconnectedCallback(): void {
        EventObservable.instance.unsubscribeAll('current-tab-updated');
    }

    private renderInfoPanel(): void {
        if (!this.panel) return;
        this.panel.innerHTML = '';
        this.panel.innerHTML = '<app-info-panel></app-info-panel>';
    }

    private renderSuggestedRoutePanel(): void {
        if (!this.panel) return;
        this.panel.innerHTML = '';
        this.panel.innerHTML = '';
    }

    private renderCustomPathPanel(): void {
        if (!this.panel) return;
        this.panel.innerHTML = '';
        this.panel.innerHTML = '<app-custom-path-panel></app-custom-path-panel>';
    }

    private switchPanel(): void {
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

    private switchTab(): void {
        this.removeSelectedStatus();

        if (!this.customRouteTab || !this.suggestedRouteTab || !this.infoTab) return;

        switch (this.currentTab) {
            case Tab.CustomPath:
                this.customRouteTab.classList.add('selected');
                break;

            case Tab.SuggestedPath:
                this.suggestedRouteTab.classList.add('selected');
                break;

            default:
                this.infoTab.classList.add('selected');
                break;
        }
    }

    private removeSelectedStatus(): void {
        const tabs: HTMLButtonElement[] = Array.from(this.shadowRoot.querySelectorAll('.tab'));
        tabs.forEach((tab: HTMLButtonElement) => tab.classList.remove('selected'));
    }
}

customElements.define('app-tabs', TabsComponent)