import { DialogType } from '../../../models/dialog-type.model';
import { Path } from '../../../models/path.model';
import { PointOfInterest } from '../../../models/poi.model';
import { SnackbarType } from '../../../models/snackbar-type.model';
import { EventObservable } from '../../../observables/event.observable';
import { DialogService } from '../../../services/dialog.service';
import { PositionService } from '../../../services/position.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { StorageService } from '../../../services/storage.service';
import { CustomPathCardComponent } from '../custom-path-card/custom-path-card.component';
import { CustomPathDownloadBtnComponent } from '../custom-path-download-btn/custom-path-download-btn.component';
import { DirectionsBtnComponent } from '../directions-btn/directions-btn.component';

import style from './custom-path-panel.component.scss?raw';

export class CustomPathPanelComponent extends HTMLElement {
    shadowRoot: ShadowRoot;
    private _path: Path = { ...StorageService.instance.selectedCustomPath };

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
        // this.update();
        EventObservable.instance.publish('load-custom-path', this.path);
    }

    public connectedCallback(): void {        
        this.render();
        this.setup();
        this.update();
        EventObservable.instance.publish('load-custom-path', this.path);
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="header">
                <h4>Percorso selezionato: ${this.path.name}</h4>
                <button is="app-custom-path-download-btn" class="btn">
                    <span class="material-symbols-outlined action-icon">download</span>
                </button>
            </div>
            <div class="list"></div>
            <div class="custom-path-tools">
                <button type="button" title="Riordina punti di interesse" class="tool-btn sort-btn"><span class="material-symbols-outlined tool-icon">sort</span></button>
                <button type="button" title="Modifica percorso" class="tool-btn edit-btn"><span class="material-symbols-outlined tool-icon">more_horiz</span></button>
                <button type="button" title="Crea nuovo percorso" class="tool-btn add-btn"><span class="material-symbols-outlined tool-icon">add</span></button>
                <button type="button" title="Salva percorso" class="tool-btn bookmark-btn"><span class="material-symbols-outlined tool-icon">bookmark</span></button>
                <button type="button" title="Carica percorsi salvati" class="tool-btn load-btn"><span class="material-symbols-outlined tool-icon">bookmarks</span></button>
            </div>
            <button is="app-directions-btn" class="btn directions-btn">
                <span class="material-symbols-outlined action-icon">directions</span>
            </button>
            `
            ;
    }

    private setup(): void {
        const sortBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.sort-btn');
        const editBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.edit-btn');
        const addBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.add-btn');
        const bookmarkBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.bookmark-btn');
        const loadBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.load-btn');
        const csvDownloadBtn: CustomPathDownloadBtnComponent | null = this.shadowRoot.querySelector('button[is="app-custom-path-download-btn"]');

        if (sortBtn) sortBtn.addEventListener('click', () => {
            PositionService.instance.position ? DialogService.instance.createFormDialog(DialogType.SortPois) : SnackbarService.instance.createSnackbar(SnackbarType.Error, '', 'Attivare la geolocalizzazione per riordinare i punti di interesse.');
        });
        if (editBtn) editBtn.addEventListener('click', () => DialogService.instance.createFormDialog(DialogType.EditPath));
        if (addBtn) addBtn.addEventListener('click', () => DialogService.instance.createFormDialog(DialogType.AddPath));
        if (bookmarkBtn) bookmarkBtn.addEventListener('click', () => DialogService.instance.createFormDialog(DialogType.BookmarkPath));
        if (loadBtn) loadBtn.addEventListener('click', () => DialogService.instance.createFormDialog(DialogType.LoadPath));
        if (csvDownloadBtn) csvDownloadBtn.path = { ...this.path };

        EventObservable.instance.subscribe('selected-custom-path-updated', (path: Path) => {
            this.path = path;
        });
    }

    private update(): void {
        const list: HTMLDivElement | null = this.shadowRoot.querySelector('.list');
        const directionsBtn: DirectionsBtnComponent | null = this.shadowRoot.querySelector('button[is="app-directions-btn"]');
        if (!list || !directionsBtn) return;

        list.innerHTML = '';
        this.path.pois.forEach((poi: PointOfInterest) => {
            let card: CustomPathCardComponent = new CustomPathCardComponent();
            card.poi = poi;
            list.appendChild(card);

            directionsBtn.pois.push(poi);
        });

        const editBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.edit-btn');
        if (editBtn && this.path.name === 'default') editBtn.disabled = true;
    }

    public disconnectedCallback(): void {
        EventObservable.instance.unsubscribeAll('selected-custom-path-updated');
    }
}

customElements.define('app-custom-path-panel', CustomPathPanelComponent);