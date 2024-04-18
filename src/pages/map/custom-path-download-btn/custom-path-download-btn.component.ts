import * as Cesium from 'cesium';
import { Path } from '../../../models/path.model';

export class CustomPathDownloadBtnComponent extends HTMLButtonElement {
    private _path: Path = Path.createEmpty();

    constructor() {
        super();
    }

    public get path(): Path {
        return this._path;
    }

    public set path(path: Path) {
        this._path = path;
        console.log(this.path);
    }

    public connectedCallback(): void {
        this.setup();
    }

    private setup(): void {
        this.addEventListener('click', () => this.downloadCsv());
    }

    private createCsvContent(): string {
        let csv: string = 'path,layer name,id,name,latitude,longitude,height,info\n';

        Object.keys(this.path).forEach((key: any) => {
            if (key !== 'pois') return;
            this.path.pois.forEach(poi => {
                const info: string = poi.props.map(prop => {
                    return `${prop.displayName}: ${prop.value}`;
                }).join('|');

                const row: string =
                    `${this.path.name},` +
                    `${poi.layerName},` +
                    `${poi.uuid},` +
                    `${poi.name},` +
                    `${Cesium.Math.toDegrees(poi.position.latitude)},` +
                    `${Cesium.Math.toDegrees(poi.position.longitude)},` +
                    `${Cesium.Math.toDegrees(poi.position.height)},` +
                    `${info}` +
                    `\n`;

                csv += row;
            });
        });

        if (csv.endsWith('\n')) csv = csv.slice(0, -1);

        return csv;
    }

    private downloadCsv(): void {
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += this.createCsvContent();
        const encodingUri: string = encodeURI(csvContent);
        const link: HTMLAnchorElement = document.createElement('a');
        link.setAttribute('href', encodingUri);
        link.setAttribute('download', `${this.path.name.replace(/[|&;$%@"<>()+,\s]/g, '').trim()}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}

customElements.define('app-custom-path-download-btn', CustomPathDownloadBtnComponent, { extends: 'button' });