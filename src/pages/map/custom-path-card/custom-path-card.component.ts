import { MyColor } from '../../../models/color.model';
import { Path } from '../../../models/path.model';
import { PoiProperty, PointOfInterest } from '../../../models/poi.model';
import { PoiService } from '../../../services/poi.service';
import { StorageService } from '../../../services/storage.service';

import style from './custom-path-card.component.scss?raw';

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
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
    }

    public get poi(): PointOfInterest | null {
        return this._poi;
    }

    public set poi(poi: PointOfInterest) {
        this._poi = poi;
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
                <button class="arrow move-up">
                    <span class="material-symbols-outlined">keyboard_arrow_up</span>                
                </button>
                <span class="order"></span>
                <button class="arrow move-down">
                    <span class="material-symbols-outlined">keyboard_arrow_down</span>
                </button>
            </div>
            <div class="info">
                <div class="title">
                    <span class="legend"></span>
                    <h4 class="name"></h4>
                </div>
                <p class="category"></p>
            </div>
            <button class="remove-btn">
                <span class="material-symbols-outlined">close</span>
            </button>
            `
            ;
    }

    private update(): void {
        if (!this.poi) return;

        const order: HTMLSpanElement | null = this.shadowRoot.querySelector('.order');
        if (order) order.innerHTML = (StorageService.instance.selectedCustomPath.pois.indexOf(this.poi) + 1).toString();

        const title: HTMLHeadingElement | null = this.shadowRoot.querySelector('.name');
        if (title) title.innerHTML = this.poi.name;

        const legend: HTMLSpanElement | null = this.shadowRoot.querySelector('.legend');
        if (legend) {
            legend.style.backgroundColor = MyColor.rgbToRgba(MyColor.hexToRgb(this.poi.layer.style.color), 0.5);        
            legend.style.borderColor = this.poi.layer.style.color;
        }

        const category: HTMLParagraphElement | null = this.shadowRoot.querySelector('.category');
        if (category) {
            this.poi.props.forEach((prop: PoiProperty) => {
                prop.displayName === 'Nome' ? category.innerHTML = prop.value : category.innerHTML = this.poi!.name;
            })
        }
    }

    private setup(): void {
        if (!this.poi) return;
        this.addEventListener('click', () => PoiService.instance.selectedPoi = this.poi);
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

        let path: Path = StorageService.instance.selectedCustomPath;
        let pois: PointOfInterest[] = [...path.pois];

        let currentIndex: number = StorageService.instance.selectedCustomPath.pois.indexOf(this.poi);
        pois.splice(currentIndex, 1);

        movement === Movement.Up ? pois.splice(currentIndex - 1, 0, this.poi) : pois.splice(currentIndex + 1, 0, this.poi);

        path.pois = pois;
        StorageService.instance.selectedCustomPath = path;
    }

    private setupRemoveBtn(): void {
        if (!this.poi) return;
        const removeBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.remove-btn');
        if (!removeBtn) return;
        removeBtn.addEventListener('click', (e: Event) => {
            e.stopPropagation();
            let currentIndex: number = StorageService.instance.selectedCustomPath.pois.indexOf(this.poi!);
            let pois: PointOfInterest[] = [...StorageService.instance.selectedCustomPath.pois];
            pois.splice(currentIndex, 1);
            StorageService.instance.selectedCustomPath = {...StorageService.instance.selectedCustomPath, pois};
        });
    }
}

customElements.define('app-custom-path-card', CustomPathCardComponent);