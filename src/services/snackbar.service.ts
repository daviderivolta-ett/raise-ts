import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { SnackbarType } from '../models/SnackbarType.model';

export class SnackbarService {
    private static _instance: SnackbarService;
    public snackbars: SnackbarComponent[] = [];
    private container: HTMLDivElement | null = null;

    constructor() {
        if (SnackbarService._instance) return SnackbarService._instance;
        SnackbarService._instance = this;
    }

    static get instance(): SnackbarService {
        if (!SnackbarService._instance) SnackbarService._instance = new SnackbarService();
        return SnackbarService._instance;
    }

    public createSnackbar(type: SnackbarType, snackbarId: string, message: string, duration?: number): void {
        this.container = document.querySelector('.snackbar-container');
        if (!this.container) return;
        const snackbar: SnackbarComponent = new SnackbarComponent();
        snackbar.id = snackbarId.replace(/[^a-zA-Z0-9-_]/g, '');
        snackbar.snackbarType = type;
        snackbar.message = message;
        if (duration) snackbar.duration = duration;
        this.container.append(snackbar);
    }

    public removeSnackbar(id: string): void {
        this.container = document.querySelector('.snackbar-container');
        if (!this.container) return;
        const validId: string = id.replace(/[^a-zA-Z0-9-_]/g, '');
        const snackbar: HTMLElement | null = this.container.querySelector(`#${validId}`);
        if (snackbar) snackbar.remove();
    }
}