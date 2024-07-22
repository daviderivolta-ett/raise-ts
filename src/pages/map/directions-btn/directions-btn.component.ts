import { PointOfInterest } from '../../../models/poi.model';

export class DirectionsBtnComponent extends HTMLButtonElement {
    private _pois: PointOfInterest[] = [];

    constructor() {
        super();
    }

    public get pois(): PointOfInterest[] {
        return this._pois;
    }
    public set pois(pois: PointOfInterest[]) {
        this._pois = pois;
    }

    public connectedCallback(): void {
        this.setup();
    }

    private setup(): void {
        this.addEventListener('click', () => {
            const url: string = `https://www.google.it/maps/dir/?api=1&origin=My+Location${this.createLatLngUrl(this.pois)}`;
            window.open(url, '_blank');
        });
    }

    private createLatLngUrl(pois: PointOfInterest[]): string {
        const poisLatLng: string[] = pois.map((poi: PointOfInterest) => `${poi.position.lat},${poi.position.lng}`);
        let destinationUrl: string = '&destination=';
        let waypointsUrl: string = '&waypoints=';
        
        if (poisLatLng.length > 1) {
            const lastLatLng: string | undefined = poisLatLng.pop();        
            waypointsUrl = waypointsUrl.concat(poisLatLng.join('|'));
            return destinationUrl + lastLatLng + waypointsUrl;
        } else {
            return '&destination=' + poisLatLng;
        }
    }
}

customElements.define('app-directions-btn', DirectionsBtnComponent, { extends: 'button' });