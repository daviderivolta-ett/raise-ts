import { DataService } from '../../../services/data.service';

import style from './tags.page.scss?raw';

export class TagsPage extends HTMLElement {
    public shadowRoot: ShadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        const sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
    }

    public async connectedCallback(): Promise<void> {
        await DataService.instance.getData();
        this.render();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="box">
                <app-tags-wall></app-tags-wall>
            </div>
            `
            ;
    }
}

customElements.define('page-tags', TagsPage);