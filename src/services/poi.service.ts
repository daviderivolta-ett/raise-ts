import * as Cesium from 'cesium';

import { PoiProperty, PoiType, PointOfInterest } from '../models/poi.model';
import { Layer } from '../models/layer.model';
import { Tab } from '../models/tab.model';

import { EventObservable } from '../observables/event.observable';
import { TabsObservable } from '../observables/tabs.observable';

export class PoiService {
    private static _instance: PoiService;
    private _selectedPoi: PointOfInterest | null = null;

    constructor() {
        if (PoiService._instance) return PoiService._instance;
        PoiService._instance = this;
    }

    static get instance(): PoiService {
        if (!PoiService._instance) PoiService._instance = new PoiService();
        return PoiService._instance;
    }

    public get selectedPoi(): PointOfInterest | null {
        return this._selectedPoi;
    }

    public set selectedPoi(selectedPoi: PointOfInterest) {
        this._selectedPoi = selectedPoi;
        EventObservable.instance.publish('selected-poi', this.selectedPoi);
        TabsObservable.instance.currentTab = Tab.Info;
    }

    public parsePoi(entity: Cesium.Entity): PointOfInterest {
        let poi: PointOfInterest = PointOfInterest.createEmpty();
        if (!entity.properties) return poi;

        let propertyBag: Cesium.PropertyBag = entity.properties;
        let propertyNames: string[] = entity.properties.propertyNames;

        propertyNames.forEach((name: string) => {
            if (propertyBag.hasProperty(name)) {
                switch (name) {
                    case 'uuid':
                        poi.uuid = (propertyBag[name] as Cesium.ConstantProperty).valueOf();
                        break;

                    case 'layer':
                        poi.layer = (propertyBag[name] as Cesium.ConstantProperty).valueOf() as Layer;
                        break;

                    case 'name':
                        poi.name = (propertyBag[name] as Cesium.ConstantProperty).valueOf();
                        break;

                    default:
                        let rawProp: any = (propertyBag[name] as Cesium.ConstantProperty).valueOf();
                        poi.props.push(this.parsePoiProperty(rawProp));
                        break;
                }
            }
        });

        poi.position = this.parsePoiPosition(entity);
        poi.type = this.parsePoiType(entity);
    
        return poi;
    }

    private parsePoiPosition(entity: Cesium.Entity): Cesium.Cartographic {
        let position: Cesium.Cartographic = Cesium.Cartographic.ZERO;

        if (entity.point && entity.position) {
            let pos: Cesium.Cartesian3 | undefined = entity.position.getValue(Cesium.JulianDate.now());
            if (pos) position = Cesium.Cartographic.fromCartesian(pos);
        }

        if (entity.polyline && entity.polyline.positions) {
            let pos: Cesium.Cartesian3 | undefined = entity.polyline.positions.getValue(Cesium.JulianDate.now())[0];
            if (pos) position = Cesium.Cartographic.fromCartesian(pos);
        }

        if (entity.polygon && entity.polygon.hierarchy) {
            let pos: Cesium.Cartesian3 | undefined = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now());
            if (pos) position = Cesium.Cartographic.fromCartesian(pos);
        }

        return position;
    }

    private parsePoiProperty(rawProp: any): PoiProperty {
        let prop: PoiProperty = PoiProperty.createEmpty();
        if (rawProp.displayName) prop.displayName = rawProp.displayName;
        if (rawProp.type) prop.type = rawProp.type;
        if (rawProp.value) prop.value = rawProp.value;
        return prop;
    }

    private parsePoiType(entity: Cesium.Entity): PoiType {
        if (entity.polyline) return PoiType.Polyline;
        if (entity.polygon) return PoiType.Polygon;
        return PoiType.Point;
    }
}