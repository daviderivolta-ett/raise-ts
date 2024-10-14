import { SidenavStatus } from '../../../models/sidenav.model';
import { EventObservable } from '../../../observables/event.observable';
import { TabsToggleObservable } from '../../../observables/tabs-toggle.observable';
import style from './tabs-sidenav.component.scss?raw';

export class TabsSidenavComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;

    private _isVisible: boolean = false;
    get isVisible(): boolean {
        return this._isVisible;
    }

    set isVisible(isVisible: boolean) {
        this._isVisible = isVisible;
        this.update();
    }

    private startY: number = 0;
    private startHeight: number = 360;
    private currentHeight: number = 0;
    private deltaHeight: number = 0;

    private _isDragging: boolean = false;
    public get isDragging(): boolean {
        return this._isDragging;
    }
    public set isDragging(isDragging: boolean) {
        this._isDragging = isDragging;

        const dragger: HTMLDivElement | null = this.shadowRoot.querySelector('.dragger');
        if (!dragger) return;
        
        this.isDragging ? dragger.classList.add('dragging') : dragger.classList.remove('dragging');
    }

    private _status: SidenavStatus = SidenavStatus.Close;
    public get status(): SidenavStatus {
        return this._status;
    }
    public set status(status: SidenavStatus) {
        this._status = status;
        this.updateStatus(status);
    }

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'open' });

        let sheet: CSSStyleSheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets.push(sheet);
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="toggle">
                <div class="dragger"></div>
            </div>
            <app-tabs></app-tabs>
            `
            ;
    }

    private setup(): void {
        EventObservable.instance.subscribe('sidenav-status-change', (status: SidenavStatus) => this.status = status);

        const toggle: HTMLDivElement | null = this.shadowRoot.querySelector('.toggle');

        if (toggle) {
            toggle.addEventListener('mousedown', this.onDragStart.bind(this));
            document.addEventListener('mousemove', this.onDragMove.bind(this));
            document.addEventListener('mouseup', this.onDragEnd.bind(this));

            toggle.addEventListener('touchstart', this.onDragStart.bind(this));
            document.addEventListener('touchmove', this.onDragMove.bind(this));
            document.addEventListener('touchend', this.onDragEnd.bind(this));
        }
    }

    private update(): void {
        this.isVisible === true ? this.classList.add('open') : this.classList.remove('open');
    }

    public disconnectedCallback(): void {
        EventObservable.instance.unsubscribeAll('sidenav-status-change');

        const toggle: HTMLDivElement | null = this.shadowRoot.querySelector('.toggle');

        if (toggle) {
            toggle.removeEventListener('mousedown', this.onDragStart.bind(this));
            toggle.removeEventListener('touchstart', this.onDragStart.bind(this));
        }
        document.removeEventListener('mousemove', this.onDragMove.bind(this));
        document.removeEventListener('mouseup', this.onDragEnd.bind(this));
        document.removeEventListener('touchmove', this.onDragMove.bind(this));
        document.removeEventListener('touchend', this.onDragEnd.bind(this));
    }

    private onDragStart(event: MouseEvent | TouchEvent): void {
        if (!this.isMobile()) return;        
        event.preventDefault();
        this.isDragging = true;
        this.startY = this.isTouchEvent(event) ? (event as TouchEvent).touches[0].clientY : (event as MouseEvent).clientY;
    }

    private onDragMove(event: MouseEvent | TouchEvent): void {
        if (!this.isMobile()) return;
        if (!this.isDragging) return;
        const clientY = this.isTouchEvent(event) ? (event as TouchEvent).touches[0].clientY : (event as MouseEvent).clientY;
        this.deltaHeight = clientY - this.startY;
        this.currentHeight = this.startHeight - this.deltaHeight;
        this.style.height = `${this.currentHeight}px`;
    }

    private onDragEnd(): void {
        if (!this.isMobile()) return;
        if (!this.isDragging) return;
        this.isDragging = false;
        
        switch (this.status) {
            case SidenavStatus.Open:
                if (Math.abs(this.deltaHeight) > 100) {
                    this.deltaHeight < 0 ? TabsToggleObservable.instance.status = SidenavStatus.Full : TabsToggleObservable.instance.status = SidenavStatus.Close;
                } else {
                    TabsToggleObservable.instance.status = SidenavStatus.Open;
                }
                break;

            case SidenavStatus.Full:
                if (Math.abs(this.deltaHeight) > 100) {
                    if (this.deltaHeight > 0) TabsToggleObservable.instance.status = SidenavStatus.Open;
                } else {
                    TabsToggleObservable.instance.status = SidenavStatus.Full;
                }
                break;

            default:
                break;
        }

        this.deltaHeight = 0;
    }

    private updateStatus(status: SidenavStatus): void {
        switch (status) {
            case SidenavStatus.Close:
                this.classList.remove('open');
                this.startHeight = 0;
                break;

            case SidenavStatus.Open:
                this.classList.add('open');

                if (this.isMobile()) {
                    this.style.height = '360px';
                    this.startHeight = 360;
                }

                break;

            case SidenavStatus.Full:
                this.style.height = '100dvh';
                this.startHeight = window.innerHeight;
                break;

            default:
                break;
        }
    }

    private isMobile(): boolean {
        return window.innerWidth <= 768;
    }

    private isTouchEvent(event: Event): event is TouchEvent {
        return 'touches' in event;
    }
}

customElements.define('app-tabs-sidenav', TabsSidenavComponent);