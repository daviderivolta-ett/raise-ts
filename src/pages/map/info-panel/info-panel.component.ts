import { MyColor } from '../../../models/color.model';
import { Path } from '../../../models/path.model';
import { PoiProperty, PoiType, PointOfInterest } from '../../../models/poi.model';
import { EventObservable } from '../../../observables/event.observable';
import { MapService } from '../../../services/map.service';
import { PoiService } from '../../../services/poi.service';
import { StorageService } from '../../../services/storage.service';

import style from './info-panel.component.scss?raw';

export class InfoPanelComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _poi: PointOfInterest | null = PoiService.instance.selectedPoi;
    private _isInfoOpen: boolean = false;

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
        this.isInfoOpen = false;
        this.update();
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

    private render(): void {
        this.shadowRoot.innerHTML = '<p>Nessun punto selezionato</p>';
    }

    private setup(): void {
        EventObservable.instance.subscribe('selected-poi', (poi: PointOfInterest) => {
            this.poi = poi;
        });
    }

    private update(): void {
        if (!this.poi) return;

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
            `
            ;

        const legend: HTMLSpanElement = this.shadowRoot.querySelector('.legend') as HTMLSpanElement;
        const category: HTMLParagraphElement = this.shadowRoot.querySelector('.category') as HTMLParagraphElement;
        const tools: HTMLDivElement = this.shadowRoot.querySelector('.tools') as HTMLDivElement;

        legend.style.backgroundColor = MyColor.rgbToRgba(MyColor.hexToRgb(this._poi!.layer.style.color), 0.5);
        legend.style.borderColor = this._poi!.layer.style.color;

        this.poi.props.forEach((prop: PoiProperty) => {
            prop.displayName === 'Nome' ? category.innerHTML = prop.value : category.innerHTML = this.poi!.name;
        });

        const directionsBtn: HTMLButtonElement | null = this.renderDirectionsBtn();
        if (directionsBtn) tools.appendChild(directionsBtn);

        const addToTouteBtn: HTMLButtonElement | null = this.renderAddToRouteBtn();
        if (addToTouteBtn) tools.append(addToTouteBtn);

        const info: HTMLDivElement | null = this.renderInfo();
        if (info) this.shadowRoot.appendChild(info);
    }

    private renderDirectionsBtn(): HTMLButtonElement | null {
        if (!this.poi) return null;
        const button: HTMLButtonElement = document.createElement('button');
        button.innerHTML = 'Indicazioni';
        button.addEventListener('click', () => MapService.instance.openGoogleMaps(this.poi!.position));
        return button;
    }

    private renderAddToRouteBtn(): HTMLButtonElement | null {
        if (!this.poi) return null;
        if (this.poi.type !== PoiType.Point) return null;
        const button: HTMLButtonElement = document.createElement('button');
        button.innerHTML = 'Aggiungi';
        button.addEventListener('click', () => {
            const selectedCustomPath: Path = StorageService.instance.selectedCustomPath;
            selectedCustomPath.pois.unshift(this.poi!);
            StorageService.instance.selectedCustomPath = selectedCustomPath;
        });
        return button;
    }

    private renderInfo(): HTMLDivElement | null {
        if (!this.poi) return null;
        const props: PoiProperty[] = this.poi.props.filter((prop: PoiProperty) => prop.displayName !== 'Nome');
        if (props.length === 0) return null;

        let info: HTMLDivElement = document.createElement('div');
        info.classList.add('info');

        const moreInfoBtn: HTMLButtonElement = this.renderMoreInfoBtn();
        info.appendChild(moreInfoBtn);

        const infoContent: HTMLDivElement = document.createElement('div');
        infoContent.classList.add('info-content');
        info.appendChild(infoContent);

        props.forEach((prop: PoiProperty) => {
            const topic: HTMLDivElement = this.renderTopic(prop);
            infoContent.appendChild(topic);
        });

        return info;
    }

    private renderMoreInfoBtn(): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement('button');
        button.innerHTML = 'Leggi info';
        button.classList.add('toggle-info');
        button.addEventListener('click', () => this.isInfoOpen = !this.isInfoOpen);
        return button;
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
        const label: HTMLHeadingElement = document.createElement('h4');
        label.innerHTML = prop.displayName;
        const info: HTMLParagraphElement = document.createElement('p');
        prop.value !== '' ? info.innerHTML = prop.value : info.innerHTML = '-';
        topic.appendChild(label);
        topic.appendChild(info);
        return topic;
    }
}

customElements.define('app-info-panel', InfoPanelComponent);