import * as Cesium from 'cesium';

export class PositionService {
    private static _instance: PositionService;
    private _position: GeolocationPosition | null = null;

    constructor() {
        if (PositionService._instance) return PositionService._instance;
        PositionService._instance = this;
    }

    public get position(): GeolocationPosition | null {
        return this._position;
    }

    public set position(position: GeolocationPosition | null) {
        this._position = position;
    }

    static get instance(): PositionService {
        if (!PositionService._instance) PositionService._instance = new PositionService();
        return PositionService._instance;
    }

    public async getUserPosition(): Promise<void> {
        try {
            const position: GeolocationPosition = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    position => {                        
                        resolve(position as GeolocationPosition);
                    },
                    error => {
                        reject(error);
                    }
                );
            });          
            this._position = position;

        } catch (error) {
            this._position = null;
        }
    }

    public static geolocationToCartographic(geolocationPosition: GeolocationPosition): Cesium.Cartographic {
        return new Cesium.Cartographic(
            geolocationPosition.coords.longitude,
            geolocationPosition.coords.latitude,
            geolocationPosition.coords.altitude || 0,
        )
    }
}