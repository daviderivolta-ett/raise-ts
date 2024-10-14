import * as d3 from 'd3';

// Template
const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML =
    `
    <div class="wrapper">
        <slot name="title"></slot>
        <div id="chart" class="chart"></div>
        <div class="chart"></div>
    </div>
    `
    ;

// Style
const style: HTMLStyleElement = document.createElement('style');
style.innerHTML =
    `
    .wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        height: calc(360px - 48px);
        width: 100%;
        box-sizing: border-box;
        background-color: #E8EEFF;
        border-radius: 8px;
    }

    slot[name="title"] {
        display: block;
        color: black;
        box-sizing: border-box;
        position: absolute;
        top: 16px;
        left: 16px;
        font-size: .9rem;
        font-weight: 600;
    }

    #chart {
        display: flex;
        flex-grow: 1;
        overflow: hidden;
        color: black;
    }

    .legend {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        flex-wrap: wrap;
    }

    .legend--hidden {
        display: none;
    }

    .legend__item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 8px 0 0;
    }

    .legend__item {
        gap: 8px;
    }

    .legend__item__circle {
        width: 8px;
        height: 8px;
        border-radius: 100%;
    }

    .legend__item__label {
        font-size: .8rem;
    }
    `
    ;

// Component
export class LineChartComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;

    private _data: [number, number][] = [];
    private _yUnit: string = 'y';
    private _xUnit: string = 'x';
    private _dateUnit: 'x' | 'y' | 'none' = 'none';
    private _padding: number = 48;
    private _currentWidth: number = 0;
    private _currentHeight: number = 0;

    private _resizeObserver: ResizeObserver;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style.cloneNode(true));

        this._resizeObserver = new ResizeObserver(() => this._drawChart());
    }

    public get data(): [number, number][] { return this._data }
    public set data(value: [number, number][]) {
        this._data = value;
        this._drawChart();
    }

    public get yUnit(): string { return this._yUnit }
    public set yUnit(value: string) {
        this._yUnit = value;
        this._drawChart();
    }

    public get xUnit(): string { return this._xUnit }
    public set xUnit(value: string) {
        this._xUnit = value;
        this._drawChart();
    }

    public get dateUnit(): 'x' | 'y' | 'none' { return this._dateUnit }
    public set dateUnit(value: 'x' | 'y' | 'none') {
        this._dateUnit = value;
        this._drawChart();
    }

    // Component callbacks
    public connectedCallback(): void {
        this._drawChart();
        const container: HTMLDivElement | null = this.shadowRoot.querySelector('.wrapper');
        if (container) this._resizeObserver.observe(container);
    }

    public disconnectedCallback(): void {

    }

    static observedAttributes: string[] = ['x-unit', 'y-unit', 'date-unit',];
    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (name === 'x-unit') this.xUnit = newValue;
        if (name === 'y-unit') this.yUnit = newValue;
        if (name === 'date-unit') {
            (newValue === 'x' || newValue === 'y') ? this.dateUnit = newValue : this.dateUnit = 'none';
        }
    }

    // Methods
    private _drawChart(): void {
        const container: HTMLDivElement | null = this.shadowRoot.querySelector('#chart');
        if (!container) return;
        container.innerHTML = '';

        // Size
        this._currentWidth = this._getContainerSize('chart', 'width');
        this._currentHeight = this._getContainerSize('chart', 'height');

        // Scale
        const data: [number, number][] = this._sortDataset(this.data);
        const isDateX = this.dateUnit === 'x';
        const isDateY = this.dateUnit === 'y';

        const xScale = isDateX
            ? d3.scaleTime()
                .domain([new Date(d3.min(data, (d: [number, number]) => d[0])!), new Date(d3.max(data, (d: [number, number]) => d[0])!)])
                .range([this._padding, this._currentWidth - this._padding])
            : d3.scaleLinear()
                .domain([d3.min(data, (d: number[]) => d[0] ?? 0)!, d3.max(data, (d: number[]) => d[0] ?? 0)!])
                .range([this._padding, this._currentWidth - this._padding]);

        const yMin: number = d3.min(data, (d: [number, number]) => d[1] ?? 0)!;
        const yMax: number = d3.max(data, (d: [number, number]) => d[1] ?? 0)!;

        const yRange: number = yMax - yMin;
        const yPadding: number = yRange * 0.1;

        const yScale = isDateY
            ? d3.scaleTime()
                .domain([new Date(d3.min(data, (d: [number, number]) => d[1])!), new Date(d3.max(data, (d: [number, number]) => d[1])!)])
                .range([this._currentHeight - this._padding, this._padding])
            : d3.scaleLinear()
                .domain([yMin - yPadding, yMax + yPadding])
                .range([this._currentHeight - this._padding, this._padding]);

        // svg
        const svg = d3.select(this.shadowRoot.querySelector('#chart'))
            .append('svg')
            .attr('width', this._currentWidth)
            .attr('height', this._currentHeight);

        // x axis
        const xAxis = svg.append('g')
            .attr('transform', 'translate(0,' + (this._currentHeight - this._padding) + ')')
            .call(d3.axisBottom(xScale).ticks(this._currentWidth / 50));

        xAxis.selectAll('text')
            .style('font-size', '.6rem')
            .style('font-family', 'Inter');

        // xAxis.selectAll('.tick')
        //     .filter((d, i) => i === 0)
        //     .style('display', 'none');

        // xAxis.selectAll('.tick')
        //     .filter((d, i, nodes) => i === nodes.length - 1)
        //     .remove();

        // y axis
        const yAxis = svg.append('g')
            .attr('transform', 'translate(' + this._padding + ', 0)')
            .call(d3.axisLeft(yScale).ticks(this._currentHeight / 25));

        yAxis.selectAll('text')
            .style('font-size', '.6rem')
            .style('font-family', 'Inter');

        yAxis.selectAll('.tick')
            .filter((d, i, nodes) => i === nodes.length - 1)
            .remove();

        yAxis.selectAll('.tick')
            .select('line')
            .style('display', 'none');

        yAxis.select('.domain')
            .style('display', 'none');

        // x uom
        svg.append('text')
            .attr('class', 'x-unit')
            .attr('x', this._currentWidth - this._padding)
            .attr('y', this._currentHeight - this._padding + 15)
            .style('font-size', '.6rem')
            .style('text-anchor', 'middle')
            .text(this.xUnit);

        // y uom
        svg.append('text')
            .attr('class', 'y-unit')
            .attr('x', this._padding - 4)
            .attr('y', this._padding)
            .style('font-size', '.6rem')
            .style('text-anchor', 'end')
            .text(this.yUnit);

        // horizontal grid
        if (yScale.ticks().length > 0 && typeof yScale.ticks()[0] === 'number') {
            svg.append('g')
                .attr('class', 'grid')
                .selectAll('line')
                .data(yScale.ticks() as number[])
                .join('line')
                .attr('y1', d => yScale(d))
                .attr('y2', d => yScale(d))
                .attr('x1', this._padding)
                .attr('x2', this._currentWidth - this._padding)
                .attr('stroke', 'var(--chart-line-color)');
        }

        if (yScale.ticks().length > 0 && yScale.ticks()[0] instanceof Date) {
            svg.append('g')
                .attr('class', 'grid')
                .selectAll('line')
                .data(yScale.ticks() as Date[])
                .join('line')
                .attr('y1', d => yScale(d))
                .attr('y2', d => yScale(d))
                .attr('x1', this._padding)
                .attr('x2', this._currentWidth - this._padding)
                .attr('stroke', 'var(--chart-line-color)');
        }

        const color: string = '#1152F7';

        // Area      
        svg.append('path')
            .datum(data)
            .attr('fill', color)
            .attr('fill-opacity', .25)
            .attr('stroke', 'none')
            .attr('d', d3.area<number[]>()
                .curve(d3.curveCardinal)
                .x(d => xScale(d[0]))
                .y0(this._currentHeight - this._padding)
                .y1(d => yScale(d[1]))
            );

        // Line
        const line = d3.line<number[]>()
            .curve(d3.curveCardinal)
            .x(d => xScale(d[0]))
            .y(d => yScale(d[1]));

        svg.append('path')
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', 2)
            .attr('d', line(data));

        // Circles
        svg.append('g')
            .attr('class', 'points-group')
            .selectAll('points')
            .data(data)
            .enter()
            .append('circle')
            .attr('fill', color)
            .attr('stroke', 'none')
            .attr('cx', d => xScale(d[0]))
            .attr('cy', d => yScale(d[1]))
            .attr('r', 2)
            .style('cursor', 'pointer')
            .on('mouseover', (event, d) => {
                d3.select('#d3-tooltip')
                    .transition().duration(200)
                    .style('opacity', 1)
                    .style('display', 'block')
                    .style('left', event.pageX + 8 + 'px')
                    .style('top', event.pageY + 8 + 'px')
                    .text(`${this.xUnit}: ${isDateX ? this._formatDate(d[0]) : d[0]}, ${this.yUnit}: ${isDateY ? this._formatDate(d[0]) : d[1]}`);
            })
            .on('mouseout', function () {
                d3.select('#d3-tooltip')
                    .style('opacity', 0)
                    .style('display', 'none');
            });

        // Tooltip
        // if (!document.querySelector('#d3-tooltip')) {
        //     d3.select('body')
        //         .append('div')
        //         .attr('id', 'd3-tooltip')
        //         .attr('style', 'position: absolute; opacity: 0; display: none; color: var(--fg-color-on-emphasis); background-color: var(--bg-color-emphasis); padding: 8px; border-radius: 4px; max-width: 200px');
        // }
    }

    private _getContainerSize(id: string, size: string): number {
        if (!d3.select(this.shadowRoot.querySelector(`#${id}`)).style(size)) return 0;
        return parseInt(d3.select(this.shadowRoot.querySelector(`#${id}`)).style(size), 10);
    }

    private _sortDataset(data: [number, number][]): [number, number][] {
        return data.slice().sort((a: [number, number], b: [number, number]) => a[0] - b[0]);
    }

    private _formatDate(timestamp: number): string {
        const date: Date = new Date(timestamp);

        const day: string = String(date.getDate()).padStart(2, '0');
        const month: string = String(date.getMonth() + 1).padStart(2, '0');
        const year: string = String(date.getFullYear());

        const hours: string = String(date.getHours()).padStart(2, '0');
        const minutes: string = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    }

    private _toggleLegend(isLegend: boolean): void {
        const legend: HTMLDivElement | null = this.shadowRoot.querySelector('.legend');
        if (legend) isLegend ? legend.classList.remove('legend--hidden') : legend.classList.add('legend--hidden');
    }

    private _drawLegend(text: string): void {
        const legend: HTMLDivElement | null = this.shadowRoot.querySelector('.legend');
        if (!legend) return;

        legend.removeAttribute('style');
        legend.innerHTML = '';

        const color: string = 'var(--data-blue-color)';

        legend.style.marginTop = '16px';
        const item: HTMLDivElement = this._drawLegendItem(color, text);
        legend.appendChild(item);
    }

    private _drawLegendItem(color: string, labelText: string): HTMLDivElement {
        const container: HTMLDivElement = document.createElement('div');
        container.classList.add('legend__item');

        const rect: HTMLDivElement = document.createElement('div');
        rect.classList.add('legend__item__circle');
        rect.style.backgroundColor = color;
        container.appendChild(rect);

        const label: HTMLSpanElement = document.createElement('span');
        label.classList.add('legend__item__label');
        label.innerText = labelText;
        container.appendChild(label);

        return container;
    }
}

customElements.define('app-line-chart', LineChartComponent);