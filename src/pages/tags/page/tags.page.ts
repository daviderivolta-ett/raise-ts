import { DataService } from "../../../services/data.service";

export class TagsPage extends HTMLElement {
    public shadowRoot: ShadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public async connectedCallback(): Promise<void> {
        await DataService.instance.getData();
        this.render();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <app-tags-wall></app-tags-wall>
            `
            ;
    }
}

customElements.define('page-tags', TagsPage);