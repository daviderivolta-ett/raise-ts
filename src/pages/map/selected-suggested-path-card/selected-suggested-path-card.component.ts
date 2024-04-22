import { MyColor } from '../../../models/color.model';
import { Layer } from '../../../models/layer.model';
import { PoiProperty, PointOfInterest } from '../../../models/poi.model';
import { DataService } from '../../../services/data.service';
import { PoiService } from '../../../services/poi.service';

import style from './selected-suggested-path-card.component.scss?raw';

export class SelectedSuggestedPathCardComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _poi: PointOfInterest = PointOfInterest.createEmpty();

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        const sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
    }

    public get poi(): PointOfInterest {
        return this._poi;
    }

    public set poi(poi: PointOfInterest) {
        this._poi = poi;
        const layer: Layer | undefined = DataService.instance.filterLayersByLayerName(this.poi.layerName);
        if (layer) this.poi.layer = layer;
    }

    public connectedCallback(): void {
        this.render();
        this.update();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="title">
                <span class="legend"></span>
                <h4 class="name"></h4>
            </div>
            <p class="category"></p>
            `
            ;
    }

    private update(): void {
        if (!this.poi) return;

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
    }
}

customElements.define('app-selected-suggested-path-card', SelectedSuggestedPathCardComponent);