import { EventObservable } from './event.observable';
import { SidenavStatus } from '../models/sidenav.model';
import { BenchToggleObservable } from './bench-toggle.observable';

export class TabsToggleObservable {
    private static _instance: TabsToggleObservable;
    private _isOpen: boolean = false;
    private _status: SidenavStatus = SidenavStatus.Close;

    private constructor() {
        if (TabsToggleObservable._instance) return TabsToggleObservable._instance;
        TabsToggleObservable._instance = this;
    }

    public static get instance(): TabsToggleObservable {
        if (!TabsToggleObservable._instance) TabsToggleObservable._instance = new TabsToggleObservable();
        return TabsToggleObservable._instance;
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    set isOpen(isOpen) {
        this._isOpen = isOpen;    
        console.log(isOpen);              
        EventObservable.instance.publish('toggle-tabs', this.isOpen);
        if (this.isOpen) EventObservable.instance.publish('toggle-bench', false);
    }

    public get status(): SidenavStatus {
        return this._status;
    }

    public set status(status: SidenavStatus) {
        this._status = status;      
        EventObservable.instance.publish('sidenav-status-change', this.status);
        if (this.status !== 0) BenchToggleObservable.instance.isOpen = false;
    }
}