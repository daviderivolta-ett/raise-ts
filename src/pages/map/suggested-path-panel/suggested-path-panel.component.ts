import { Path } from '../../../models/path.model';
import { EventObservable } from '../../../observables/event.observable';
import { StorageService } from '../../../services/storage.service';
import { SuggestedPathCardComponent } from '../suggested-path-card/suggested-path-card.component';

import style from './suggested-path-panel.component.scss?raw';

export class SuggestedPathPanelComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _paths: Path[] = [];

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        const sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
    }

    public get paths(): Path[] {
        return this._paths;
    }

    public set paths(paths: Path[]) {
        this._paths = paths;
        this.update();
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
        this.paths = StorageService.instance.getSuggestedPaths();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="header">
                <h4>Percorsi suggeriti</h4>
            </div>
            <div class="list"></div>
            `
            ;
    }

    private setup(): void {
        EventObservable.instance.subscribe('active-layers-updated', () => {
            this.paths = StorageService.instance.getSuggestedPaths();
        });
    }

    private update(): void {
        const list: HTMLDivElement | null = this.shadowRoot.querySelector('.list');
        if (!list) return;

        list.innerHTML = '';        
        this.paths.forEach((path: Path) => {
            let card: SuggestedPathCardComponent = new SuggestedPathCardComponent();
            card.path = path;
            list.append(card);
        });

        if (this.paths.length === 0) list.innerHTML = '<p class="empty-msg">Nessun percorso suggerito per i layer correnti</p>';
    }
}

customElements.define('app-suggested-path-panel', SuggestedPathPanelComponent);