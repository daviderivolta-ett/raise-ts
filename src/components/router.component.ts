import { Route, RouteType } from '../models/route.model';

export class Router extends HTMLElement {
    public shadowRoot: ShadowRoot;
    public routes: Route[] = [];

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public connectedCallback(): void {
        window.addEventListener('hashchange', (): void => {
            this.checkRoute();
        });
    }

    public addRoutes(routes: Route[]) {
        this.routes = [...routes];
        this.checkRoute();
    }

    private checkRoute(): void {
        const hash: string = window.location.hash.slice(2);   
        this.changeRoute(hash);
    }

    private changeRoute(hash: string): void {
        if (!hash) {
            const defaultRoute: Route[] = this.routes.filter((route: Route) => route.type === RouteType.Default);
            defaultRoute ? window.location.hash = '#/' + defaultRoute[0].url : this.sendNotFound();
        } else {
            const hashIndex: number = this.routes.findIndex((route: Route) => route.url === hash);
            this.shadowRoot.innerHTML = this.routes[hashIndex] ? this.routes[hashIndex].routing() : this.sendNotFound();
        }
    }

    private sendNotFound(): string {
        const notFoundRoute: Route[] = this.routes.filter((route: Route) => route.type === RouteType.NotFound);       
        if (notFoundRoute.length === 0) return '404: Not found';       
        window.location.hash = '#/' + notFoundRoute[0].url;
        this.changeRoute(notFoundRoute[0].url);
        return '404: Not found';
    }
}

customElements.define('app-router', Router);