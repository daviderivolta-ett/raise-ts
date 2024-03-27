import { PointOfInterest } from './poi.model';

export class Path {
    name: string;
    pois: PointOfInterest[];
    lastSelected: boolean;

    constructor(
        name: string,
        pois: PointOfInterest[],
        lastSelected: boolean
    ) {
        this.name = name;
        this.pois = pois;
        this.lastSelected = lastSelected;
    }

    static createEmpty(): Path {
        return new Path('', [], true);
    }

    static createDefault(): Path {
        return new Path('default', [], true);
    }
}