import { CustomPathFormComponent } from '../custom-path-form/custom-path-form.component';

export class DialogComponent extends HTMLDialogElement {
    private closeBtn: HTMLButtonElement = document.createElement('button');
    
    constructor() {
        super();
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
        this.showModal();
    }

    private render(): void {
        this.closeBtn.innerHTML = `<span class="material-symbols-outlined close-icon">close</span>`;
        this.closeBtn.classList.add('close');
        this.prepend(this.closeBtn);
    }

    private setup(): void {
        const closeBtn: HTMLButtonElement | null = this.querySelector('button');
        if (closeBtn) closeBtn.addEventListener('click', () => this.close());
        document.addEventListener('keydown', this.handleKeydown.bind(this));

        const form: CustomPathFormComponent | null = this.querySelector('app-custom-path-form');
        if (form) form.addEventListener('close-dialog', () => this.close());
    }

    private handleKeydown(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    public close(): void {
        this.remove();
    }
}

customElements.define('app-dialog', DialogComponent, { extends: 'dialog' });