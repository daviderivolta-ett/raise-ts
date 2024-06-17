import * as Cesium from 'cesium';
import { EventObservable } from '../observables/event.observable';

export class PositionService {
    private static _instance: PositionService;
    private _position: GeolocationPosition | null = null;
    private _watchId: number | null = null;

    constructor() {
        if (PositionService._instance) return PositionService._instance;
        PositionService._instance = this;
    }

    public get position(): GeolocationPosition | null {
        return this._position;
    }

    public set position(position: GeolocationPosition | null) {
        this._position = position;
        EventObservable.instance.publish('set-position', this.position);
    }

    public get watchId(): number | null {
        return this._watchId;
    }

    public set watchId(watchId: number | null) {
        this._watchId = watchId;
    }

    static get instance(): PositionService {
        if (!PositionService._instance) PositionService._instance = new PositionService();
        return PositionService._instance;
    }

    public async getPosition(): Promise<GeolocationPosition | null> {        
        try {
            const position: GeolocationPosition = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    position => resolve(position as GeolocationPosition),
                    error => reject(error)
                )
            });
            
            return position;
        } catch (error) {
            return null;
        }
    }

    public async startWatchingUserPosition(): Promise<void> {
        try {
            this.watchId = navigator.geolocation.watchPosition(
                position => this.position = position as GeolocationPosition,
                error => {
                    throw error;
                }
                ,
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            )
        } catch (error) {
            this.position = null;
        }
    }

    public stopWatchingPosition(): void {
        if (!this.watchId) return;
        navigator.geolocation.clearWatch(this.watchId);
        this.watchId = null;
    }

    public static geolocationToCartographic(geolocationPosition: GeolocationPosition): Cesium.Cartographic {
        return new Cesium.Cartographic(
            geolocationPosition.coords.longitude,
            geolocationPosition.coords.latitude,
            geolocationPosition.coords.altitude || 0,
        )
    }
}