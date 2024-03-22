import { Path } from '../../../models/Path.model';
import { PointOfInterest } from '../../../models/PointOfInterest.model';
import { EventObservable } from '../../../observables/event.observable';
import { PathService } from '../../../services/path.service';
import { CustomPathCardComponent } from '../custom-path-card/custom-path-card.component';

export class CustomPathComponent extends HTMLElement {
    shadowRoot: ShadowRoot;
    private _path: Path = PathService.instance.selectedCustomPath;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get path(): Path {
        return this._path;
    }

    public set path(path: Path) {
        this._path = path;
        this.update();
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
        this.update();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <h4>Percorso selezionato: ${this.path.name}</h4>
            <div class="list"></div>
            `
            ;
    }

    private setup(): void {
        EventObservable.instance.subscribe('selected-custom-path-updated', (path: Path) => {
            this.path = path;
        });
    }

    private update(): void {
        const list: HTMLDivElement | null = this.shadowRoot.querySelector('.list');
        if (!list) return;
        list.innerHTML = '';
        this.path.pois.forEach((poi: PointOfInterest) => {
            let card: CustomPathCardComponent = new CustomPathCardComponent();
            card.poi = poi;
            list.appendChild(card);
        });
    }

}

customElements.define('app-custom-path-panel', CustomPathComponent);