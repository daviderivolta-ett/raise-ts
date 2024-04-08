import { EventObservable } from "../../../observables/event.observable";
import { PositionService } from "../../../services/position.service";

export class CenterPositionBtn extends HTMLButtonElement {
    private _isOpen: boolean = false;

    constructor() {
        super();
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    set isOpen(isOpen: boolean) {
        this._isOpen = isOpen;
        this.isOpen === true ? this.classList.add('open') : this.classList.remove('open');
    }

    public connectedCallback(): void {
        this.setup();
    }

    private setup(): void {
        this.addEventListener('click', async () => {         
            await PositionService.instance.getUserPosition();           
            if (PositionService.instance.position) {
                EventObservable.instance.publish('set-camera', PositionService.instance.position);
                EventObservable.instance.publish('check-user-position', PositionService.instance.position);
            } else {
                EventObservable.instance.publish('set-camera', null);
            }
        });

        EventObservable.instance.subscribe('toggle-tabs', (isOpen: boolean) => {
            this.isOpen = isOpen;
        })
    }

    public disconnectedCallback(): void {
        EventObservable.instance.unsubscribeAll('toggle-tabs');
    }
}

customElements.define('app-center-position-btn', CenterPositionBtn, { extends: 'button' });