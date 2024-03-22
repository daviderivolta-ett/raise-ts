import { Path } from '../../../models/Path.model';
import { PointOfInterest } from '../../../models/PointOfInterest.model';
import { PathService } from '../../../services/path.service';
import { PoiService } from '../../../services/poi.service';

import stye from './custom-path-card.component.scss?raw';

enum Movement {
    Up = 'up',
    Down = 'down'
}

export class CustomPathCardComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _poi: PointOfInterest | null = null;

    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        let sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(stye);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
    }

    public get poi(): PointOfInterest | null {
        return this._poi;
    }

    public set poi(poi: PointOfInterest) {
        this._poi = poi;
        // this.update();
    }

    public connectedCallback(): void {
        this.render();
        this.update();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="change-order">
                <button class="arrow move-up">su</button>
                <span class="order"></span>
                <button class="arrow move-down">giù</button>
            </div>
            <div class="info">
                <div class="title">
                    <span class="legend"></span>
                    <h4 class="name"></h4>
                </div>
                <p class="category"></p>
            </div>
            <button class="remove-btn">X</button>
            `
            ;
    }

    private update(): void {
        if (!this.poi) return;

        const order: HTMLSpanElement | null = this.shadowRoot.querySelector('.order');
        if (order) order.innerHTML = (PathService.instance.selectedCustomPath.pois.indexOf(this.poi) + 1).toString();

        const title: HTMLHeadingElement | null = this.shadowRoot.querySelector('.name');
        if (title) title.innerHTML = this.poi.name;

        const legend: HTMLSpanElement | null = this.shadowRoot.querySelector('.legend');
        if (legend) {
            legend.style.backgroundColor = this.poi.layer.style.color;
        }
    }

    private setup(): void {
        if (!this.poi) return;
        this.addEventListener('click', () => PoiService.instance.selectedPoi = this.poi!);
        this.setupOrderBtns();
        this.setupRemoveBtn();
    }

    private setupOrderBtns(): void {
        const moveUpBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.move-up');
        if (moveUpBtn) moveUpBtn.addEventListener('click', (e: Event) => {
            e.stopPropagation();
            this.changeOrder(Movement.Up);
        });

        const moveDownBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.move-down');
        if (moveDownBtn) moveDownBtn.addEventListener('click', (e: Event) => {
            e.stopPropagation();
            this.changeOrder(Movement.Down);
        });
    }

    private changeOrder(movement: Movement): void {
        if (!this.poi) return;

        let path: Path = PathService.instance.selectedCustomPath;
        let pois: PointOfInterest[] = [...path.pois];

        let currentIndex: number = PathService.instance.selectedCustomPath.pois.indexOf(this.poi);
        pois.splice(currentIndex, 1);

        movement === Movement.Up ? pois.splice(currentIndex - 1, 0, this.poi) :pois.splice(currentIndex + 1, 0, this.poi);

        path.pois = pois;
        PathService.instance.selectedCustomPath = path;
    }

    private setupRemoveBtn(): void {
        if (!this.poi) return;
        const removeBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.remove-btn');
        if (!removeBtn) return;
        removeBtn.addEventListener('click', (e: Event) => {
            e.stopPropagation();
            let currentIndex: number = PathService.instance.selectedCustomPath.pois.indexOf(this.poi!);
            let path: Path = PathService.instance.selectedCustomPath;
            path.pois.splice(currentIndex, 1);
            PathService.instance.selectedCustomPath = path;
        });
    }
}

customElements.define('app-custom-path-card', CustomPathCardComponent);