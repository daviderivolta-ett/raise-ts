import { DialogType } from "../models/DialogType.model";

import { CustomPathFormComponent } from "../pages/map/custom-path-form/custom-path-form.component";
import { DialogComponent } from "../pages/map/dialog/dialog.component";

export class DialogService {
    private static _instance: DialogService;

    constructor() {
        if (DialogService._instance) return DialogService._instance;
        DialogService._instance = this;
    }

    static get instance(): DialogService {
        if (!DialogService._instance) DialogService._instance = new DialogService();
        return DialogService._instance;
    }

    private createDialog(): DialogComponent {
        const dialog: DialogComponent = new DialogComponent();
        dialog.setAttribute('is', 'app-dialog');
        return dialog;
    }

    public createFormDialog(type: DialogType): void {
        const dialog : DialogComponent = this.createDialog();
        const form: CustomPathFormComponent = new CustomPathFormComponent();
        form.type = type;
        dialog.appendChild(form);
        document.body.append(dialog);
    }
}