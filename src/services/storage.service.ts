import * as Cesium from 'cesium';

import { Layer, LayerProperty, LayerStyle, PropertyType, SavedLayers } from '../models/layer.model';
import { PoiProperty, PoiType, PointOfInterest } from '../models/poi.model';
import { Path } from '../models/path.model';
import { Tab } from '../models/tab.model';

import { EventObservable } from '../observables/event.observable';
import { TabsObservable } from '../observables/tabs.observable';

export class StorageService {
    private static _instance: StorageService;
    private _paths: Path[] = [];
    private _selectedCustomPath: Path = Path.createDefault();
    private _layers: SavedLayers = { active: [], bench: [] };
    private _activeLayers: Layer[] = [];
    private _benchLayers: Layer[] = [];

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

    public get layers(): SavedLayers {
        return this._layers;
    }

    public set layers(layers: SavedLayers) {
        this._layers = layers;
        localStorage.setItem('layers', JSON.stringify(this.layers));
    }

    public get activeLayers(): Layer[] {
        return this._activeLayers;
    }

    public set activeLayers(activeLayers: Layer[]) {
        this._activeLayers = activeLayers;
        EventObservable.instance.publish('active-layers-updated', this.activeLayers);
        this.layers = { ...this.layers, active: this.activeLayers };
    }

    public get benchLayers(): Layer[] {
        return this._benchLayers;
    }

    public set benchLayers(benchLayers: Layer[]) {
        this._benchLayers = benchLayers;
        EventObservable.instance.publish('bench-layers-updated', this.benchLayers);
        this.layers = { ...this.layers, bench: this.benchLayers };
    }

    public set selectedCustomPath(selectedCustomPath: Path) {
        this._selectedCustomPath = selectedCustomPath;
        EventObservable.instance.publish('selected-custom-path-updated', this.selectedCustomPath);
        TabsObservable.instance.currentTab = Tab.CustomPath;
    }

    public getSavedLayers(): void {
        const savedLayersString: string | null = localStorage.getItem('layers');
        if (!savedLayersString) return;

        const rawSavedLayers: any = JSON.parse(savedLayersString);
        let savedLayers: SavedLayers = { active: [], bench: [] };

        savedLayers.active = rawSavedLayers.active.map((layer: any) => this.parseLayer(layer));
        savedLayers.bench = rawSavedLayers.bench.map((layer: any) => this.parseLayer(layer));

        this._layers = savedLayers;
        this._activeLayers = this._layers.active;
        this._benchLayers = this._layers.bench;
    }

    public getCustomPaths(): void {
        const pathsString: string | null = localStorage.getItem('paths');
        if (!pathsString) return;
        const rawPaths: any[] = JSON.parse(pathsString);
        const paths: Path[] = rawPaths.map((path: any) => this.parseCustomPath(path));
        this._paths = paths;
    }

    public setCustomPaths(): void {
        localStorage.setItem('paths', JSON.stringify(this.paths));
    }

    private parseCustomPath(path: any): Path {
        let p: Path = Path.createEmpty();

        if (path.lastSelected) p.lastSelected = path.lastSelected;
        if (path.name) p.name = path.name;
        if (path.pois) p.pois = path.pois.map((poi: any) => this.parsePoi(poi));

        return p;
    }

    private parsePoi(poi: any): PointOfInterest {
        let p: PointOfInterest = PointOfInterest.createEmpty();

        p.layer = this.parseLayer(poi.layer);
        p.name = poi.name;
        p.position = new Cesium.Cartographic(poi.position.longitude, poi.position.latitude, poi.position.height);
        p.props = poi.props.map((prop: any) => this.parsePoiProperty(prop));
        p.type = this.parsePoiType(poi.type);
        p.uuid = poi.uuid;

        return p;
    }

    private parseLayer(layer: any): Layer {
        return new Layer(
            layer.name,
            layer.layer,
            layer.url = layer.url,
            new LayerStyle(layer.style.color, layer.style.opacity),
            layer.tags,
            layer.relevantProperties.map((property: any) => {
                let p: LayerProperty = LayerProperty.createEmpty();
                p.displayName = property.displayName;
                p.propertyName = property.propertyName;

                switch (property.type) {
                    case 'image':
                        p.type = PropertyType.Image;
                        break;
                    case 'number':
                        p.type = PropertyType.Number;
                        break;
                    default:
                        p.type = PropertyType.String;
                        break;
                }

                return p;
            })
        );
    }

    private parsePoiProperty(rawProp: any): PoiProperty {
        let prop: PoiProperty = PoiProperty.createEmpty();
        if (rawProp.displayName) prop.displayName = rawProp.displayName;
        if (rawProp.type) prop.type = rawProp.type;
        if (rawProp.value) prop.value = rawProp.value;
        return prop;
    }

    private parsePoiType(type: string): PoiType {
        let t: PoiType;
        switch (type) {
            case 'polyline':
                t = PoiType.Polyline;
                break;
            case 'polygon':
                t = PoiType.Polygon;
                break;
            default:
                t = PoiType.Point;
                break;
        }

        return t;
    }

    public editPath(name: string): void {
        const path: Path | undefined = this.paths.find((path: Path) => path.lastSelected === true);
        if (!path) return;
        const paths: Path[] = this.paths.filter((path: Path) => path.lastSelected !== true);
        path.name = name;
        paths.push(path);
        this.selectedCustomPath = path;

        this.setCustomPaths();
    }

    public deletePath(): void {
        const paths: Path[] = this.paths.filter((path: Path) => path.lastSelected !== true);
        const defaultPath: Path | undefined = this.paths.find((path: Path) => path.name === 'default');
        if (defaultPath) this.selectedCustomPath = defaultPath;
        this.paths = [...paths];

        this.setCustomPaths();
    }

    public saveNewPath(name: string): void {
        this.paths = this.paths.map((path: Path) => (path.lastSelected = false, path));
        const path: Path = Path.createEmpty();
        path.lastSelected = true;
        path.name = name;
        this.paths.push(path);
        this.selectedCustomPath = path;

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