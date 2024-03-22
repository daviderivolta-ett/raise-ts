import { Path } from '../models/Path.model';
import { Tab } from '../models/Tab.model';
import { EventObservable } from '../observables/event.observable';
import { TabsObservable } from '../observables/tabs.observable';

export class PathService {
    private static _instance: PathService;
    private _selectedCustomPath: Path = Path.createDefault();

    constructor() {
        if (PathService._instance) return PathService._instance;
        PathService._instance = this;
    }

    static get instance(): PathService {
        if (!PathService._instance) PathService._instance = new PathService();
        return PathService._instance;
    }

    public get selectedCustomPath(): Path {
        return this._selectedCustomPath;
    }

    public set selectedCustomPath(selectedCustomPath: Path) {     
        this._selectedCustomPath = selectedCustomPath;    
        EventObservable.instance.publish('selected-custom-path-updated', this.selectedCustomPath);
        TabsObservable.instance.currentTab = Tab.CustomPath;
    }
}