import * as Cesium from 'cesium';

import { Poi, PointOfInterest } from '../models/poi.model';
import { LngLat } from 'maplibre-gl';

export class TspService {
    private static _instance: TspService;

    constructor() {
        if (!TspService._instance) {
            TspService._instance = this;
        }
    }

    static get instance(): TspService {
        if (!TspService._instance) TspService._instance = new TspService();
        return TspService._instance;
    }

    private calculateDistance(firstPosition: LngLat, secondPosition: LngLat) {
        const dx: number = firstPosition.lng - secondPosition.lng;
        const dy: number = firstPosition.lat - secondPosition.lat;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public nearestInsertion(pois: PointOfInterest[], initialPosition: LngLat) {
        const remainingPois: PointOfInterest[] = [...pois];

        let currentIndex: number = 0;
        let minDistance: number = this.calculateDistance(initialPosition, remainingPois[0].position);

        for (let i = 1; i < remainingPois.length; i++) {
            const distance: number = this.calculateDistance(initialPosition, remainingPois[i].position);
            if (distance < minDistance) {
                minDistance = distance;
                currentIndex = i;
            }
        }

        const path: PointOfInterest[] = [remainingPois.splice(currentIndex, 1)[0]];

        while (remainingPois.length > 0) {
            minDistance = Number.MAX_VALUE;
            let nextIndex: number = 0;

            for (let i = 0; i < remainingPois.length; i++) {
                const distance: number = this.calculateDistance(path[path.length - 1].position, remainingPois[i].position);
                if (distance < minDistance) {
                    minDistance = distance;
                    nextIndex = i;
                }
            }
            path.push(remainingPois.splice(nextIndex, 1)[0]);
        }

        return path.reverse();
    }

}