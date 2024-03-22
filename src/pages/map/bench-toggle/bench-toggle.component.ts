import { BenchToggleObservable } from '../../../observables/bench-toggle.observable';
import { EventObservable } from '../../../observables/event.observable';

export class BenchToggleComponent extends HTMLButtonElement {
    private _isOpen: boolean = false;

    constructor() {
        super();
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    set isOpen(isOpen: boolean) {
        this._isOpen = isOpen;
    }

    public connectedCallback(): void {
        this.setup();
    }

    private setup(): void {
        this.addEventListener('click', () => {
            BenchToggleObservable.instance.isOpen = !this.isOpen;
        });

        EventObservable.instance.subscribe('toggle-bench', (isOpen: boolean) => {
            this.isOpen = isOpen;
        });
    }
}

customElements.define('app-bench-toggle', BenchToggleComponent, { extends: 'button' });