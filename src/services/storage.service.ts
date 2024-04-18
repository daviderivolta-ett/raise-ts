import * as Cesium from 'cesium';

import { Layer, LayerProperty, LayerStyle, PropertyType, SavedLayers } from '../models/layer.model';
import { PoiProperty, PoiType, PointOfInterest } from '../models/poi.model';
import { Path } from '../models/path.model';
import { Tab } from '../models/tab.model';

import { EventObservable } from '../observables/event.observable';
import { TabsObservable } from '../observables/tabs.observable';
import { SnackbarService } from './snackbar.service';
import { SnackbarType } from '../models/snackbar-type.model';

export class StorageService {
    private static _instance: StorageService;
    private _tags: string[] = [];
    private _paths: Path[] = [];
    private _selectedCustomPath: Path = Path.createDefault();
    private _suggestedPaths: Path[] = [Path.createEmpty()];
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

    public get tags(): string[] {
        return this._tags;
    }

    public set tags(tags: string[]) {
        this._tags = tags;
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

    public get suggestedPaths(): Path[] {
        return this._suggestedPaths;
    }

    public set suggestedPaths(suggestedPaths: Path[]) {
        this._suggestedPaths = suggestedPaths;
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

    public getCsvPaths(fileNumber: number): void {
        let index = 0;
        const paths: Path[] = [];
        const promises: Promise<any>[] = [];

        while (index <= fileNumber) {
            const promise = fetch(`./suggested-paths/${index}.tsv`)
                .then(res => res.text())
                .then(data => {
                    const parsedCsv: Record<string, string>[] = this.parseCsvFile(data);
                    paths.push(this.parseCsvPath(parsedCsv));
                })
                .catch(error => console.error('Errore durante il recupero dei percorsi suggeriti', error))

            promises.push(promise);
            index++;
        }      
        Promise.all(promises).then(() => this.suggestedPaths = [...paths]);
    }

    private parseCsvFile(text: any): Record<string, string>[] {
        const lines: string[] = text.split('\n');

        const data: Record<string, string>[] = lines.map((line: string) => {
            const columns: string[] = line.split('\t');

            return {
                path: columns[0],
                layerName: columns[1],
                id: columns[2],
                name: columns[3],
                latitude: columns[4],
                longitude: columns[5],
                height: columns[6],
                info: columns[7],
            }
        });

        return data;
    }

    private parseCsvPath(data: Record<string, string>[]): Path {
        let path: Path = Path.createEmpty();

        path.name = data[1].path;
        path.lastSelected = false;

        data.forEach((d: Record<string, string>, index) => {
            if (index === 0) return;
            path.pois.push(this.parseCsvPoi(d));
        });

        return path;
    }

    private parseCsvPoi(data: Record<string, string>): PointOfInterest {
        let poi: PointOfInterest = PointOfInterest.createEmpty();

        poi.layerName = data.layerName;
        poi.layer = Layer.createEmpty();
        poi.name = data.name;
        poi.position = Cesium.Cartographic.fromDegrees(parseFloat(data.longitude), parseFloat(data.latitude), parseFloat(data.height));
        poi.type = PoiType.Point;
        poi.uuid = data.id;
        poi.props = this.parseCsvPoiProperties(data.info);

        return poi;
    }

    private parseCsvPoiProperties(data: string): PoiProperty[] {
        let properties: PoiProperty[] = [];

        const props: string[] = data.split('|');

        props.forEach((prop: string) => {
            let property: PoiProperty = PoiProperty.createEmpty();
            property.displayName = prop.split(':')[0];
            property.value = prop.split(':')[1].trim();
            property.type = PropertyType.String;

            properties.push(property);
        });

        return properties;
    }

    public setTags(tags: string[]): void {
        localStorage.setItem('tags', JSON.stringify(tags));
        this.tags = tags;
    }

    public getTags(): void {
        const tagsString: string | null = localStorage.getItem('tags');
        if (!tagsString) return;

        const tags: string[] = JSON.parse(tagsString);
        this.tags = tags;
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
        this.paths = paths;
    }

    public setCustomPaths(): void {
        localStorage.setItem('paths', JSON.stringify(this.paths));
    }

    private parseCustomPath(path: any): Path {
        let p: Path = Path.createEmpty();

        if (typeof path.lastSelected === 'boolean') p.lastSelected = path.lastSelected;
        if (path.name) p.name = path.name;
        if (path.pois) p.pois = path.pois.map((poi: any) => this.parsePoi(poi));

        return p;
    }

    private parsePoi(poi: any): PointOfInterest {
        let p: PointOfInterest = PointOfInterest.createEmpty();

        p.layer = this.parseLayer(poi.layer);
        p.layerName = poi.layerName;
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

    public addPoiToSelectedPath(poi: PointOfInterest): void {
        if (this.isPoiInSelectedPath(poi)) {
            SnackbarService.instance.createSnackbar(SnackbarType.Temporary, 'already-present', 'Il punto di interesse si trova già nel percorso selezionato.');
            return;
        }
        const pois: PointOfInterest[] = [...this.selectedCustomPath.pois];
        pois.unshift(poi);
        this.selectedCustomPath = { ...Path.createEmpty(), name: this.selectedCustomPath.name }; // TODO
        this.selectedCustomPath = { ...this.selectedCustomPath, pois };
    }

    public isPoiInSelectedPath(poi: PointOfInterest): boolean {
        return this.selectedCustomPath.pois.some((p: PointOfInterest) => p.name === poi.name);
    }

    public editPath(name: string): void {
        const path: Path | undefined = this.paths.find((path: Path) => path.lastSelected === true);
        if (!path) return;
        const paths: Path[] = this.paths.filter((path: Path) => path.lastSelected !== true);
        path.name = name;
        paths.push(path);
        this.selectedCustomPath = path;

        this.paths = paths;
        this.setCustomPaths();

        SnackbarService.instance.createSnackbar(SnackbarType.Temporary, 'modified-path', `Percorso ${name} modificato con successo.`);
    }

    public deletePath(): void {
        const paths: Path[] = this.paths.filter((path: Path) => path.lastSelected !== true);
        const defaultPath: Path | undefined = this.paths.find((path: Path) => path.name === 'default');
        if (defaultPath) {
            defaultPath.lastSelected = true;
            this.selectedCustomPath = defaultPath
        };

        this.paths = [...paths];
        this.setCustomPaths();

        SnackbarService.instance.createSnackbar(SnackbarType.Temporary, 'deleted-path', `Percorso eliminato con successo.`);
    }

    public saveNewPath(name: string): void {
        const paths = this.paths.map((path: Path) => (path.lastSelected = false, path));
        const path: Path = Path.createEmpty();

        path.lastSelected = true;
        path.name = name;
        paths.push(path);
        this.selectedCustomPath = path;

        this.paths = paths;
        this.setCustomPaths();

        SnackbarService.instance.createSnackbar(SnackbarType.Temporary, 'new-path', `Percorso ${name} creato con successo.`);
    }

    public savePath(): void {
        const paths: Path[] = this.paths.filter((path: Path) => path.lastSelected !== true);
        paths.push(this.selectedCustomPath);

        this.paths = paths;
        this.setCustomPaths();

        SnackbarService.instance.createSnackbar(SnackbarType.Temporary, 'saved-path', `Percorso salvato con successo.`);
    }

    public loadPath(name: string): void {
        const path: Path | undefined = this.paths.find((path: Path) => path.name === name);
        if (!path) return;

        const paths: Path[] = this.paths;
        paths.forEach((path: Path) => path.lastSelected = false);
        path.lastSelected = true;
        this.selectedCustomPath = path;

        this.paths = paths;
        this.setCustomPaths();

        SnackbarService.instance.createSnackbar(SnackbarType.Temporary, 'loaded-path', `Percorso ${name} caricato con successo.`);
    }
}