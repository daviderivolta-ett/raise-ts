import { Tab } from '../models/tab.model';
import { EventObservable } from './event.observable';

export class TabsObservable {
    private static _instance: TabsObservable;
    private _currentTab: Tab = Tab.Info;
    private _isSuggestedPathSelected: boolean = false;

    private constructor() {
        if (TabsObservable._instance) return TabsObservable._instance;
        TabsObservable._instance = this;
    }

    static get instance(): TabsObservable {
        if (!TabsObservable._instance) TabsObservable._instance = new TabsObservable();
        return TabsObservable._instance;
    }

    public get currentTab(): Tab {
        return this._currentTab;
    }

    public set currentTab(currentTab: Tab) {
        this._currentTab = currentTab;        
        EventObservable.instance.publish('current-tab-updated', this.currentTab);
    }

    public get isSuggestedPathSelected(): boolean {
        return this._isSuggestedPathSelected;
    }

    public set isSuggestedPathSelected(isSuggestedPathSelected: boolean) {
        this._isSuggestedPathSelected = isSuggestedPathSelected;
    }
}