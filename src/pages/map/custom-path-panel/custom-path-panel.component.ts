import { DialogType } from '../../../models/DialogType.model';
import { Path } from '../../../models/Path.model';
import { PointOfInterest } from '../../../models/PointOfInterest.model';
import { EventObservable } from '../../../observables/event.observable';
import { DialogService } from '../../../services/dialog.service';
import { StorageService } from '../../../services/storage.service';
import { CustomPathCardComponent } from '../custom-path-card/custom-path-card.component';

import style from './custom-path-panel.scss?raw';

export class CustomPathComponent extends HTMLElement {
    shadowRoot: ShadowRoot;
    private _path: Path = StorageService.instance.selectedCustomPath;

    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        let sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
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
            <div class="custom-path-tools">
                <button type="button" class="tool-btn sort-btn"><span class="material-symbols-outlined">sort</span></button>
                <button type="button" class="tool-btn edit-btn"><span class="material-symbols-outlined">more_horiz</span></button>
                <button type="button" class="tool-btn add-btn"><span class="material-symbols-outlined">add</span></button>
                <button type="button" class="tool-btn bookmark-btn"><span class="material-symbols-outlined">bookmark</span></button>
                <button type="button" class="tool-btn load-btn"><span class="material-symbols-outlined">bookmarks</span></button>
            </div>
            `
            ;
    }

    private setup(): void {
        const sortBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.sort-btn');
        const editBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.edit-btn');
        const addBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.add-btn');
        const bookmarkBtn : HTMLButtonElement | null = this.shadowRoot.querySelector('.bookmark-btn');
        const loadBtn : HTMLButtonElement | null = this.shadowRoot.querySelector('.load-btn');

        if (sortBtn) sortBtn.addEventListener('click', () => DialogService.instance.createFormDialog(DialogType.SortPois));
        if (editBtn) editBtn.addEventListener('click', () => DialogService.instance.createFormDialog(DialogType.EditPath));
        if (addBtn) addBtn.addEventListener('click', () => DialogService.instance.createFormDialog(DialogType.AddPath));
        if (bookmarkBtn) bookmarkBtn.addEventListener('click', () => DialogService.instance.createFormDialog(DialogType.BookmarkPath));
        if (loadBtn) loadBtn.addEventListener('click', () => DialogService.instance.createFormDialog(DialogType.LoadPath));

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

        const editBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.edit-btn');     
        if (editBtn && this.path.name === 'default') editBtn.disabled = true;
    }

}

customElements.define('app-custom-path-panel', CustomPathComponent);