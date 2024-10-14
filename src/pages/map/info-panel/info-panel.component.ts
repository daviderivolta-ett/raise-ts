import { MyColor } from '../../../models/color.model';
import { LayerComponent } from '../../../models/layer.model';
import { PoiProperty, PoiType, PointOfInterest } from '../../../models/poi.model';
import { EventObservable } from '../../../observables/event.observable';
import { PoiService } from '../../../services/poi.service';
import { StorageService } from '../../../services/storage.service';
import { DirectionsBtnComponent } from '../directions-btn/directions-btn.component';

import style from './info-panel.component.scss?raw';

export class InfoPanelComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _poi: PointOfInterest | null = PoiService.instance.selectedPoi;
    private _isInfoOpen: boolean = false;

    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'open' });

        let sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
    }

    public get poi(): PointOfInterest | null {
        return this._poi;
    }

    public set poi(poi: PointOfInterest | null) {
        this._poi = poi;
        this.isInfoOpen = false;
        // this.update();     
    }

    public get isInfoOpen(): boolean {
        return this._isInfoOpen;
    }

    public set isInfoOpen(isInfoOpen: boolean) {
        this._isInfoOpen = isInfoOpen;
        this.toggleInfo();
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
        if (this.poi) this.update();
    }

    public disconnectedCallback(): void {
        EventObservable.instance.unsubscribe('selected-poi', this.handleSelectedPoi);
    }

    private handleSelectedPoi = (poi: PointOfInterest): void => {
        this.poi = poi;
    }

    private render(): void {
        this.shadowRoot.innerHTML = '<p class="empty-msg">Nessun punto selezionato</p>';
    }

    private setup(): void {        
        // this.handleSelectedPoi = this.handleSelectedPoi.bind(this);
        EventObservable.instance.subscribe('selected-poi', this.handleSelectedPoi);
    }

    private update(): void {
        if (!this.poi) {
            this.render();
            return;
        }       

        this.shadowRoot.innerHTML =
            `
            <div class="header">
                <div class="title">
                    <span class="legend"></span>
                    <h4 class="name">${this.poi.name}</h4>
                </div>
                <p class="category"></p>
            </div>
            <div class="tools"></div>
            <div class="info">
                <div class="info-content"></div>
                <div class="components"><slot name="components"></slot></div>
            </div>
            `
            ;

        const legend: HTMLSpanElement = this.shadowRoot.querySelector('.legend') as HTMLSpanElement;
        const category: HTMLParagraphElement = this.shadowRoot.querySelector('.category') as HTMLParagraphElement;
        const tools: HTMLDivElement = this.shadowRoot.querySelector('.tools') as HTMLDivElement;

        legend.style.backgroundColor = MyColor.rgbToRgba(MyColor.hexToRgb(this._poi!.layer.style.color), 0.5);
        legend.style.borderColor = this._poi!.layer.style.color;

        if (this.poi.props.length === 0) category.innerHTML = this.poi.name;
        this.poi.props.forEach((prop: PoiProperty) => {
            prop.displayName === 'Nome' ? category.innerHTML = prop.value : category.innerHTML = this.poi!.name;
        });

        const directionsBtn: DirectionsBtnComponent | null = this.shadowRoot.querySelector('.directions-btn');
        if (directionsBtn) directionsBtn.pois = [this.poi];

        const addToTouteBtn: HTMLButtonElement | null = this.renderAddToRouteBtn();
        if (addToTouteBtn) tools.append(addToTouteBtn);

        const info: HTMLDivElement | null = this.renderInfo();
        if (info) this.shadowRoot.appendChild(info);

        if (this._hasLayerAction(this.poi)) {
            this.poi.layer.components.forEach((c: LayerComponent) => {
                const comp: any = document.createElement(c.tag);
                for (const key in c.props) comp[key] = c.props[key];
                this.poi?.props.forEach((prop: PoiProperty) => {
                    comp[prop.propertyName] = prop.value;
                });
                comp.setAttribute('slot', 'components');
                this.appendChild(comp);
            });
        }

    }

    private renderAddToRouteBtn(): HTMLButtonElement | null {
        if (!this.poi) return null;
        if (this.poi.type !== PoiType.Point) return null;
        const button: HTMLButtonElement = document.createElement('button');
        button.classList.add('add-to-path-btn');
        button.innerHTML = 'Aggiungi';
        button.addEventListener('click', () => {
            if (this.poi) StorageService.instance.addPoiToSelectedPath(this.poi);
        }, { once: true });
        return button;
    }

    private renderInfo(): HTMLDivElement | null {
        if (!this.poi) return null;
        const props: PoiProperty[] = this.poi.props.filter((prop: PoiProperty) => prop.displayName !== 'Nome');
        if (props.length === 0) return null;

        let info: HTMLDivElement | null = this.shadowRoot.querySelector('.info');
        if (!info) return null;

        let infoContent: HTMLDivElement | null = this.shadowRoot.querySelector('.info-content');
        if (!infoContent) return null;

        props.forEach((prop: PoiProperty) => {
            const topic: HTMLDivElement = this.renderTopic(prop);
            infoContent.appendChild(topic);
        });

        return info;
    }

    private toggleInfo(): void {
        const infoContent: HTMLDivElement | null = this.shadowRoot.querySelector('.info-content');
        const moreInfoBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.toggle-info');

        if (!infoContent) return;
        if (!moreInfoBtn) return;

        this.isInfoOpen ? infoContent.classList.add('visible') : infoContent.classList.remove('visible');
        this.isInfoOpen ? moreInfoBtn.innerHTML = 'Mostra meno' : moreInfoBtn.innerHTML = 'Leggi info';
    }

    private renderTopic(prop: PoiProperty): HTMLDivElement {
        const topic: HTMLDivElement = document.createElement('div');
        topic.classList.add('property');
        const label: HTMLLabelElement = document.createElement('label');
        label.classList.add('property-label');
        label.innerHTML = prop.displayName;
        const info: HTMLParagraphElement = document.createElement('p');
        info.classList.add('property-value');
        prop.value !== '' ? info.innerHTML = prop.value : info.innerHTML = '-';
        topic.appendChild(label);
        topic.appendChild(info);
        return topic;
    }

    private _hasLayerAction(poi: PointOfInterest): boolean {
        return poi.layer.hasAction ? true : false;
    }
}

customElements.define('app-info-panel', InfoPanelComponent);