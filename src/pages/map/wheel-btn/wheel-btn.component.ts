// Template
const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML =
    `
    <button type="button" class="wheel__btn">
        <slot name="icon">Button</slot>
    </button>
    <div class="wheel__content">
        <slot name="content">Content</slot>
    </div>
    `
    ;

// Style
const style: HTMLStyleElement = document.createElement('style');
style.innerHTML =
    `
    .wheel__btn {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        font-family: 'Material Symbols Outlined';
        font-size: 1.5rem;
        width: 40px;
        height: 40px;
        border: none;
        border-radius: var(--border-radius-m);

        background-color: var(--primary-container);
        color: var(--on-primary-container);
    }

    .wheel__btn:hover {
        color: var(--on-surface);
    }

    .wheel__content {
        display: flex;
        opacity: 0;
        visibility: hidden;
        position: absolute;
        gap: 8px;
        transition: opacity .2s ease, visibility .2s ease;
    }

    .wheel__content--horizontal {
        bottom: 0;
        right: 48px;
        flex-direction: row;
    }

    .wheel__content--vertical {
        bottom: 48px;
        left: 50%;
        transform: translateX(-50%);
        flex-direction: column;
    }

    .wheel__content--visible {
        opacity: 1;
        visibility: visible;
    }
    `
    ;

// Component
export class WheelBtnComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _isOpen: boolean = false;
    private _callback: () => void = () => { };

    private _layout: 'horizontal' | 'vertical' = 'horizontal';

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style.cloneNode(true));
    }

    public get isOpen(): boolean { return this._isOpen }
    public set isOpen(value: boolean) {
        this._isOpen = value;
        this._toggleWheel(value);
    }

    public get callback(): () => void { return this._callback }
    public set callback(value: () => void) {
        this._callback = value;
    }

    public get layout(): 'horizontal' | 'vertical' { return this._layout }
    public set layout(value: 'horizontal' | 'vertical') {
        this._layout = value;
        this._changeLayout(value);
    }

    // Component callbacks
    public connectedCallback(): void {
        this._render();
        this._setup();
    }

    public disconnectedCallback(): void {
        const elements: HTMLElement[] = this._getSlottedElements();
        elements.forEach((el: HTMLElement) => {
            el.removeEventListener('click', () => this.isOpen = false);
        });
    }

    static observedAttributes: string[] = ['layout'];
    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (name === 'layout' && (newValue === 'horizontal' || newValue === 'vertical')) {
            this.layout = newValue;
        }
    }

    // Methods
    private _render(): void {
        this._checkLayoutAttribute() ? null : this.setAttribute('layout', 'horizontal');
    }

    private _checkLayoutAttribute(): boolean {
        const attribute: string | null = this.getAttribute('layout');
        return attribute ? true : false;
    }

    private _getSlottedElements(): HTMLElement[] {
        const slot: HTMLSlotElement | null = this.shadowRoot.querySelector('slot[name="content"]');
        if (!slot) return [];
        const elements: HTMLElement[] = slot.assignedElements() as HTMLElement[];
        return elements;
    }

    private _changeLayout(layout: 'horizontal' | 'vertical'): void {
        const content: HTMLDivElement | null = this.shadowRoot.querySelector('.wheel__content');
        if (!content) return;

        switch (layout) {
            case 'horizontal':
                content.classList.remove('wheel__content--vertical');
                content.classList.add('wheel__content--horizontal');
                break;
            case 'vertical':
                content.classList.remove('wheel__content--horizontal');
                content.classList.add('wheel__content--vertical');
                break;
            default:
                break;
        }
    }

    private _setup(): void {
        this._setupToggle();
        this._setupSlottedElements();
    }

    private _setupToggle(): void {
        const button: HTMLButtonElement | null = this.shadowRoot.querySelector('.wheel__btn');
        if (!button) return;
        button.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            this.isOpen ? this._executeCallback(this._callback) : null;
        });
    }

    private _setupSlottedElements(): void {
        const elements: HTMLElement[] = this._getSlottedElements();
        elements.forEach((el: HTMLElement) => {
            el.addEventListener('click', () => this.isOpen = false);
        });
    }

    private _toggleWheel(isOpen: boolean): void {
        const wheel: HTMLDivElement | null = this.shadowRoot.querySelector('.wheel__content');
        if (!wheel) return;
        isOpen ? wheel.classList.add('wheel__content--visible') : wheel.classList.remove('wheel__content--visible');
    }

    private _executeCallback(callback: () => void): void {
        callback();
    }
}

customElements.define('app-wheel-btn', WheelBtnComponent);