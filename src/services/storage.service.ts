import { Path } from '../models/Path.model';
import { Tab } from '../models/Tab.model';
import { EventObservable } from '../observables/event.observable';
import { TabsObservable } from '../observables/tabs.observable';

export class StorageService {
    private static _instance: StorageService;
    private _paths: Path[] = [];
    private _selectedCustomPath: Path = Path.createDefault();

    constructor() {
        if (StorageService._instance) return StorageService._instance;
        StorageService._instance = this;
    }

    static get instance(): StorageService {
        if (!StorageService._instance) StorageService._instance = new StorageService();
        return StorageService._instance;
    }

    public get paths(): Path[] {
        return this._paths;
    }

    public set paths(paths: Path[]) {
        this._paths = paths;
    }

    public get selectedCustomPath(): Path {
        return this._selectedCustomPath;
    }

    public set selectedCustomPath(selectedCustomPath: Path) {
        this._selectedCustomPath = selectedCustomPath;
        EventObservable.instance.publish('selected-custom-path-updated', this.selectedCustomPath);
        TabsObservable.instance.currentTab = Tab.CustomPath;
    }

    public getCustomPaths(): void {
        const pathsString: string | null = localStorage.getItem('paths');
        if (pathsString) this.paths = JSON.parse(pathsString) as Path[];
    }

    public setCustomPaths(): void {
        localStorage.setItem('paths', JSON.stringify(this.paths));
    }

    public editPath(name: string): void {
        const path: Path | undefined = this.paths.find((path: Path) => path.lastSelected === true);
        if (!path) return;
        const paths: Path[] = this.paths.filter((path: Path) => path.lastSelected !== true);
        path.name = name;
        paths.push(path);

        this.setCustomPaths();
    }

    public saveNewPath(name: string): void {
        this.paths = this.paths.map((path: Path) => (path.lastSelected = false, path));
        const path: Path = Path.createEmpty();
        path.lastSelected = true;
        path.name = name;
        this.paths.push(path);

        this.setCustomPaths();
    }

    public savePath(): void {
        const paths: Path[] = this.paths.filter((path: Path) => path.lastSelected !== true);
        paths.push(this.selectedCustomPath);
        this.paths = [...paths];

        this.setCustomPaths();
    }

    public loadPath(name: string): void {
        const path: Path | undefined = this.paths.find((path: Path) => path.name === name);
        if (!path) return;
        this.selectedCustomPath = path;
    }
}