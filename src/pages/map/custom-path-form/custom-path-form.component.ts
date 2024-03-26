import { DialogType } from '../../../models/DialogType.model';
import { Path } from '../../../models/Path.model';
import { PointOfInterest } from '../../../models/PointOfInterest.model';
import { PositionService } from '../../../services/position.service';
import { StorageService } from '../../../services/storage.service';
import { TspService } from '../../../services/tsp.service';
import * as Cesium from 'cesium';

export class CustomPathFormComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _type: DialogType | null = null;
    private _paths: Path[] = StorageService.instance.paths as Path[];

    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    get type(): DialogType | null {
        return this._type;
    }

    set type(type: DialogType | null) {
        this._type = type;
    }

    get paths(): Path[] {
        return this._paths;
    }

    set paths(paths: Path[]) {
        this._paths = paths;
    }

    public connectedCallback(): void {
        this.render();
        this.update();
        this.setup();
    }

    private render(): void { }

    private setup(): void {
        const cancelBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.cancel-btn');
        const form: HTMLFormElement | null = this.shadowRoot.querySelector('.form');
        if (cancelBtn) cancelBtn.addEventListener('click', () => this.dispatchEvent(new CustomEvent('close-dialog')));
        if (form) form.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.dispatchEvent(new CustomEvent('close-dialog'));
        });
    }

    private update(): void {
        switch (this.type) {
            case DialogType.SortPois:
                this.renderSortPoisForm();
                this.setupSortPoisForm();
                break;

            case DialogType.AddPath:
                this.renderAddPathForm();
                this.setupAddPathForm();
                break;

            case DialogType.BookmarkPath:
                this.renderBookmarkPathForm();
                this.setupBookmarkPathForm();
                break;

            case DialogType.LoadPath:
                this.renderLoadPathForm();
                this.setupLoadPathForm();
                break;

            default:
                this.renderEditPathForm();
                this.setupEditPathForm();
                break;
        }
    }

    private renderSortPoisForm(): void {
        this.shadowRoot.innerHTML =
            `
            <form class="form">
                <h4>Riordina</h4>
                <p>Riordinare i punti di interesse del percorso ${StorageService.instance.selectedCustomPath.name}?</p>
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Riordina</button>
                 </div>
            </form>
            `
            ;
    }

    private setupSortPoisForm(): void {
        const form: HTMLFormElement | null = this.shadowRoot.querySelector('.form');
        if (!form) return;

        form.addEventListener('submit', () => {
            const position: GeolocationPosition | null = PositionService.instance.position;
            if (!position) return;

            const cartographic: Cesium.Cartographic = PositionService.geolocationToCartographic(position);
            const pois: PointOfInterest[] = TspService.instance.nearestInsertion(StorageService.instance.selectedCustomPath.pois, cartographic);
            const path: Path = StorageService.instance.selectedCustomPath;
            path.pois = pois;
            StorageService.instance.selectedCustomPath = path;
        });
    }

    private renderEditPathForm(): void {
        this.shadowRoot.innerHTML =
            `
            <form class="form">
                <h4>Modifica percorso</h4>
                <input type="text" name="path-name" class="path-name-input">
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Salva</button>
                </div>
                <button type="button" class="delete-btn">Elimina percorso</button>
            </form>
            `
            ;
    }

    private setupEditPathForm(): void {
        const nameInput: HTMLInputElement | null = this.shadowRoot.querySelector('input');
        if (!nameInput) return;

        const deleteBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.delete-btn');
        if (!deleteBtn) return;

        const submitBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.submit-btn');
        if (!submitBtn) return;

        const form: HTMLFormElement | null = this.shadowRoot.querySelector('.form');
        if (!form) return;

        nameInput.value = StorageService.instance.selectedCustomPath.name;
        const checkInput = () => submitBtn.disabled = nameInput.value.trim().length === 0 || StorageService.instance.paths.some((path: Path) => path.name === nameInput.value.toLowerCase());
        nameInput.addEventListener('input', checkInput);
        nameInput.addEventListener('change', checkInput);

        form.addEventListener('submit', () => {
            const data: FormData = new FormData(form);
            const pathName: FormDataEntryValue | null = data.get('path-name');
            if (pathName) StorageService.instance.editPath(pathName.toString());
        });

        deleteBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('close-dialog'));
            StorageService.instance.deletePath();
        });
    }

    private renderAddPathForm(): void {
        this.shadowRoot.innerHTML =
            `
            <form class="form">
                <h4>Nuovo percorso</h4>
                <p>Scegli il nome del nuovo percorso</p>
                <input type="text" class="path-name-input">
                <p>Attenzione: questa azione eliminerà i dati non salvati sul percorso attualmente selezionato.</p>
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Salva</button>
                </div>
            </form>
            `
            ;
    }

    private setupAddPathForm(): void {
        const nameInput: HTMLInputElement | null = this.shadowRoot.querySelector('input');
        if (!nameInput) return;

        const submitBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.submit-btn');
        if (!submitBtn) return;

        const form: HTMLFormElement | null = this.shadowRoot.querySelector('.form');
        if (!form) return;

        if (nameInput.value.length === 0) submitBtn.disabled = true;

        const checkInput = () => {
            submitBtn.disabled = nameInput.value.trim().length === 0 || StorageService.instance.paths.some((path: Path) => path.name === nameInput.value.toLowerCase());
        };

        nameInput.addEventListener('input', checkInput);
        nameInput.addEventListener('change', checkInput);

        form.addEventListener('submit', () => StorageService.instance.saveNewPath(nameInput.value));
    }

    private renderBookmarkPathForm(): void {
        this.shadowRoot.innerHTML =
            `
            <form class="form">
                <h4>Salva</h4>
                <p>Questa sovrascriverà i dati relativi al percorso ${(this.paths.find((path: Path) => path.lastSelected === true)?.name)}. Procedere?</p>
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Salva</button>
                </div>
            </form>
            `
    }

    private setupBookmarkPathForm(): void {
        const form: HTMLFormElement | null = this.shadowRoot.querySelector('.form');
        if (!form) return;
        form.addEventListener('submit', () => StorageService.instance.savePath());
    }

    private renderLoadPathForm(): void {
        this.shadowRoot.innerHTML =
            `
            <form class="form">
                <h4>Carica percorso</h4>
                <p>Percorsi salvati in memoria.</p>
                <div class="list"></div>
                <div class="call-to-actions">
                    <button type="button" class="cancel-btn">Annulla</button>
                    <button type="submit" class="submit-btn">Carica</button>
                </div>
            </form>
            `
            ;

        const list: HTMLDivElement | null = this.shadowRoot.querySelector('.list');
        if (list) {
            this.paths.forEach((path: Path) => {
                const radio: HTMLDivElement = this.createRadioBtn(path);
                list.appendChild(radio);
            });
        }
    }

    private setupLoadPathForm(): void {
        const form: HTMLFormElement | null = this.shadowRoot.querySelector('.form');
        if (!form) return;
        form.addEventListener('submit', () => {
            const data: FormData = new FormData(form);
            const selectedPath: FormDataEntryValue | null = data.get('saved-paths');
            if (selectedPath) StorageService.instance.loadPath(selectedPath.toString());
        });
    }

    private createRadioBtn(path: Path): HTMLDivElement {
        const selection: HTMLDivElement = document.createElement('div');
        const radio: HTMLInputElement = document.createElement('input');
        const label: HTMLLabelElement = document.createElement('label');
        selection.classList.add('selection');
        radio.type = 'radio';
        radio.name = 'saved-paths';
        radio.id = path.name.replace(' ', '');
        radio.value = path.name.replace(' ', '');
        if (path.name === StorageService.instance.selectedCustomPath.name) radio.checked = true;
        label.innerHTML = path.name;
        label.setAttribute('for', path.name.replace(' ', ''));
        selection.appendChild(radio);
        selection.appendChild(label);
        return selection;
    }
}

customElements.define('app-custom-path-form', CustomPathFormComponent);