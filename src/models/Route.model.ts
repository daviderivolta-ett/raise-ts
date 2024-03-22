export enum RouteType {
    Default = 'default',
    Page = 'page',
    NotFound = 'not-found'
}

type RoutingCallback = () => string;

export class Route {
    url: string;
    type: RouteType;
    routing: RoutingCallback;

    constructor(url: string, type: RouteType, routing: RoutingCallback) {
        this.url = url;
        this.type = type;
        this.routing = routing;
    }
}