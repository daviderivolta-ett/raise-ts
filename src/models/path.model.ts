import { PointOfInterest } from './poi.model';

export class Path {
    id: string;
    name: string;
    pois: PointOfInterest[];
    lastSelected: boolean;

    constructor(
        name: string,
        pois: PointOfInterest[],
        lastSelected: boolean
    ) {
        this.id = generateId();
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

function generateId(): string {
    const getRandomUppercaseLetter = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    const getRandomLowercaseLetter = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);

    let id: string = '';
    while (id.length !== 20) {
        const randomNum: number = Math.floor(Math.random() * 100);
        id += randomNum % 2 === 0 ? getRandomUppercaseLetter() : getRandomLowercaseLetter();
    }

    return id;
}