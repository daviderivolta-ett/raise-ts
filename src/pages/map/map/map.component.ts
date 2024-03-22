import * as Cesium from 'cesium';
import cesiumStyle from 'cesium/Build/Cesium/Widgets/widgets.css?raw';
import { MapService } from '../../../services/map.service';
import { TabsToggleObservable } from '../../../observables/tabs-toggle.observable';
import { BenchToggleObservable } from '../../../observables/bench-toggle.observable';

import style from './map.component.scss?raw';
import { PoiService } from '../../../services/poi.service';
import { PointOfInterest } from '../../../models/PointOfInterest.model';

export class MapComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    public container: HTMLElement = document.createElement('div');
    public viewer!: Cesium.Viewer;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });

        let sheet: CSSStyleSheet = new CSSStyleSheet();
        let cesiumSheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replace(style);
        cesiumSheet.replace(cesiumStyle);
        this.shadowRoot.adoptedStyleSheets = [cesiumSheet, sheet];
    }

    public connectedCallback(): void {
        this.render();
        if (this.viewer) MapService.instance.viewer = this.viewer;
        this.setup();
    }

    private render(): void {
        // html
        this.container.classList.add('map');
        this.shadowRoot.append(this.container);

        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjY2YmYxNy1mNTM2LTRlOWYtYTUyZC01ZmY0NjBhNzllMWEiLCJpZCI6MTY5MDU3LCJpYXQiOjE2OTU4ODQ4NzB9.bN66rOR5h37xuKVsuUSYRSLOGJy-34IhH9S1hr4NOOE';
        this.viewer = new Cesium.Viewer(this.container, {
            baseLayerPicker: false,
            geocoder: false,
            timeline: false,
            animation: false,
            homeButton: false,
            navigationInstructionsInitiallyVisible: false,
            navigationHelpButton: false,
            sceneModePicker: false,
            fullscreenButton: false,
            infoBox: false,
            sceneMode: Cesium.SceneMode.SCENE2D,
            mapMode2D: Cesium.MapMode2D.ROTATE,
            mapProjection: new Cesium.WebMercatorProjection()
        });
    }

    private setup(): void {
        this.viewer.screenSpaceEventHandler.setInputAction((movement: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
            this.mouseOver(movement);
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        this.viewer.screenSpaceEventHandler.setInputAction((movement: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
            this.clickOnMap(movement);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    private mouseOver(movement: Cesium.ScreenSpaceEventHandler.MotionEvent): void {
        const windowPosition: Cesium.Cartesian2 = movement.endPosition;
        const pickedEntity: Cesium.Cesium3DTileFeature = this.viewer.scene.pick(windowPosition);

        pickedEntity ? document.body.style.cursor = 'pointer' : document.body.style.cursor = 'default';
    }

    private clickOnMap(movement: Cesium.ScreenSpaceEventHandler.PositionedEvent): void {           
        const windowPosition: Cesium.Cartesian2 = movement.position;  
        const pickedObject: any = this.viewer.scene.pick(windowPosition);
        
        if (!pickedObject || !pickedObject.id) {
            TabsToggleObservable.instance.isOpen = false;
            BenchToggleObservable.instance.isOpen = false;
            return;
        }

        if (!(pickedObject.id instanceof Cesium.Entity)) return;

        const entity: Cesium.Entity = pickedObject.id;
    
        BenchToggleObservable.instance.isOpen = false;
        TabsToggleObservable.instance.isOpen = true;        

        const poi: PointOfInterest = PoiService.instance.parsePoi(entity);
        PoiService.instance.selectedPoi = poi;
        MapService.instance.setCameraToPosition(poi.position);
    }
}

customElements.define('app-map', MapComponent);