export class EventObservable {
    private static _instance: EventObservable;
    private listeners: { [key: string]: Function[] } = {};

    private constructor() {
        if (EventObservable._instance) return EventObservable._instance;
        EventObservable._instance = this;
    }

    public static get instance(): EventObservable {
        if (!EventObservable._instance) {
            EventObservable._instance = new EventObservable();
        }
        return EventObservable._instance;
    }

    public subscribe(eventType: string, callback: Function): void {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push(callback);
    }

    public publish(eventType: string, data: any): void {
        if (this.listeners[eventType]) {
            this.listeners[eventType].forEach(callback => callback(data));
        }
    }
}
