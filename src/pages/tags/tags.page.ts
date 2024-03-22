export class TagsPage extends HTMLElement {
    public shadowRoot: ShadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public connectedCallback(): void {
        this.shadowRoot.innerHTML = '<p>TAGS PAGE</p>';
    }
}

customElements.define('page-tags', TagsPage);