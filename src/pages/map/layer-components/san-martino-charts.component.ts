import { LineChartComponent } from "./line-chart.component";

type Chart = {
    name: string;
    unit: string;
    values: [number, number][];
}

// Template
const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML =
    `
    <div class="charts"></diV
    `
    ;

// Style
const style: HTMLStyleElement = document.createElement('style');
style.innerHTML =
    `
    .charts {
        display: flex;
        flex-direction: column;
        gap: 24px;
        width: 100%;
    }
    `
    ;

// Component
export class SanMartinoChartsComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _url: string = '';
    private _id: string = '';
    private _data: any;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style.cloneNode(true));
    }

    public get url(): string { return this._url }
    public set url(value: string) {
        this._url = value;
        this._updateData();
    }

    public get id(): string { return this._id }
    public set id(value: string) {
        this._id = value;
        this._updateData();
    }

    public get data(): any { return this._data }
    public set data(value: any) {
        this._data = value;   
        this._render(this._parseData(value));
    }

    // Component callbacks
    public connectedCallback(): void { }

    public disconnectedCallback(): void { }

    static observedAttributes: string[] = [];
    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void { }

    // Methods
    private _render(chartData: Chart[]): void {
        const wrapper = this.shadowRoot.querySelector('.charts');
        if (!wrapper) return;

        wrapper.innerHTML = '';      
        chartData.forEach((d: Chart) => {
            const chart: LineChartComponent = new LineChartComponent();
            chart.xUnit = 'Data';
            chart.yUnit = d.unit;
            chart.dateUnit = 'x';
            chart.data = d.values;
            const title: HTMLElement = document.createElement('span');
            title.innerHTML = d.name.replace('_', ' ').replace(/^./, (char) => char.toUpperCase());
            title.setAttribute('slot', 'title');
            chart.appendChild(title);
            wrapper.appendChild(chart);
        });
    }

    private async _fetchUrl(url: string, id: string): Promise<any> {
        try {
            const res: Response = await fetch(url + id.split('_')[1]);
            const data: any = await res.json();
            return data;
        } catch (error) {
            console.error(`Errore nel fetch dei dati da ${url}`);
        }
    }

    private async _updateData(): Promise<void> {
        if (this._url && this._id) {
            const data: any = await this._fetchUrl(this._url, this._id);
            this.data = data;
        }
    }

    private _parseData(data: any) {
        const result: Chart[] = Object.keys(data.metadata.units).map((unit: string) => ({
            name: unit,
            unit: data.metadata.units[unit],
            values: data.values.map((item: any) => [new Date(item.timestamp).getTime(), item[unit]])
        }));
        return result;
    }
}

customElements.define('app-san-martino-charts', SanMartinoChartsComponent);