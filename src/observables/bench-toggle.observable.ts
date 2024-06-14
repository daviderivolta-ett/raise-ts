import { SidenavStatus } from "../models/sidenav.model";
import { EventObservable } from "./event.observable";
import { TabsToggleObservable } from "./tabs-toggle.observable";

export class BenchToggleObservable {
    private static _instance: BenchToggleObservable;
    private _isOpen: boolean = false;

    constructor() {
        if (BenchToggleObservable._instance) return BenchToggleObservable._instance;
        BenchToggleObservable._instance = this;
    }

    public static get instance(): BenchToggleObservable {
        if (!BenchToggleObservable._instance) BenchToggleObservable._instance = new BenchToggleObservable();
        return BenchToggleObservable._instance;
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    set isOpen(isOpen) {
        this._isOpen = isOpen;
        EventObservable.instance.publish('toggle-bench', this.isOpen);
        if (this.isOpen) TabsToggleObservable.instance.status = SidenavStatus.Close;
    }
}