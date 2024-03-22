import { EventObservable } from "../../../observables/event.observable";
import { MapService } from "../../../services/map.service";
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
                MapService.instance.setCameraToPosition(PositionService.instance.position);
                MapService.instance.checkUserPin(PositionService.instance.position);
            } else {
                MapService.instance.setCameraToPosition(null);
            }
        });

        EventObservable.instance.subscribe('toggle-tabs', (isOpen: boolean) => {
            this.isOpen = isOpen;
        })
    }
}

customElements.define('app-center-position-btn', CenterPositionBtn, { extends: 'button' });