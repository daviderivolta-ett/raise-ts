import { Layer } from '../../../models/layer.model';
import { DataService } from '../../../services/data.service';
import { StorageService } from '../../../services/storage.service';

import style from './tags-wall.component.scss?raw';

export class TagsWallComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _tags: string[] = [];

    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        const sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
    }

    public get tags(): string[] {
        return this._tags;
    }

    public set tags(tags: string[]) {
        this._tags = tags;
    }

    public connectedCallback(): void {
        this.tags = DataService.instance.getAllTags(DataService.instance.data);
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="logo-wrapper">           
                <img src="./images/RAISE_pictogram_no_bg.svg" alt="Raise logo" class="logo">
            </div>
            <div class="header">
                <h1>Cosa vorresti vedere?</h1>
                <p class="desc">Scegli le categorie di dati che vorresti visualizzare in mappa</p>
            </div>
            <form>
                <div class="tags-wall"></div>
                <button type="submit" class="submit-btn">Continua</button>
            </form>
            `
            ;

        const wall: HTMLDivElement | null = this.shadowRoot.querySelector('.tags-wall');
        if (!wall) return;

        this.tags.forEach((tag: string) => {
            let chip: HTMLDivElement = this.createChip(tag);
            wall.append(chip);
        });
    }

    private setup(): void {
        const form: HTMLFormElement | null = this.shadowRoot.querySelector('form');
        if (!form) return;
        form.addEventListener('submit', (e: SubmitEvent) => {
            e.preventDefault();
            const formData: FormData = new FormData(form);
            const tags: string[] = Array.from(formData.getAll('tag'), (value: FormDataEntryValue) => String(value));
            StorageService.instance.setTags(tags);
            
            const layers: Layer[] = DataService.instance.filterLayersByTags(DataService.instance.data, tags);           
            StorageService.instance.activeLayers = layers;
            StorageService.instance.benchLayers = [];
            window.location.hash = '/map';
        });
    }

    private createChip(tag: string): HTMLDivElement {
        let chip: HTMLDivElement = document.createElement('div');
        chip.classList.add('chip');

        let checkbox: HTMLInputElement = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = tag.replace(' ', '').toLowerCase();
        checkbox.name = 'tag';
        checkbox.value = tag;

        StorageService.instance.tags.forEach((t: string) => {
            if (t === tag) checkbox.checked = true;
        });

        let label: HTMLLabelElement = document.createElement('label');
        label.setAttribute('for', tag.replace(' ', '').toLowerCase());
        label.innerHTML = tag.charAt(0).toUpperCase() + tag.slice(1);

        chip.append(checkbox);
        chip.append(label);

        return chip;
    }
}

customElements.define('app-tags-wall', TagsWallComponent);