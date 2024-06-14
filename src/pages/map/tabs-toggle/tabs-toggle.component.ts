import { SidenavStatus } from '../../../models/sidenav.model';
import { EventObservable } from '../../../observables/event.observable';
import { TabsToggleObservable } from '../../../observables/tabs-toggle.observable';

export class TabsToggleComponent extends HTMLButtonElement {
    private _isOpen: boolean = false;
    private icon: HTMLSpanElement;

    constructor() {
        super();
        this.icon = this.querySelector('.material-symbols-outlined') as HTMLSpanElement;
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    set isOpen(isOpen: boolean) {
        this._isOpen = isOpen;
        this.update();
    }

    public connectedCallback() {
        this.setup();
    }

    private setup(): void {
        this.addEventListener('click', () => {                 
            TabsToggleObservable.instance.status !== 0 ? TabsToggleObservable.instance.status = 0 : TabsToggleObservable.instance.status = 1;
        });

        EventObservable.instance.subscribe('sidenav-status-change', (status: SidenavStatus) => {
            status === 0 ? this.isOpen = false : this.isOpen = true;
        });
    }

    private update(): void {
        this.isOpen ? this.icon.innerHTML = 'close' : this.icon.innerHTML = 'menu';
    }

    public disconnectedCallback(): void {
        EventObservable.instance.unsubscribeAll('sidenav-status-change');
    }
}

customElements.define('app-tabs-toggle', TabsToggleComponent, { extends: 'button' });