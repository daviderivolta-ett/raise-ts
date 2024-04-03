import { EventObservable } from './event.observable';

export class TabsToggleObservable {
    private static _instance: TabsToggleObservable;
    private _isOpen: boolean = false;

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
        EventObservable.instance.publish('toggle-tabs', this.isOpen);
        if (this.isOpen) EventObservable.instance.publish('toggle-bench', false);
    }
}