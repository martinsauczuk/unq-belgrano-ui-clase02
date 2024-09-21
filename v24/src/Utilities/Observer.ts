export class Observer {
    private observers: (() => void)[]

    public constructor() {
        this.observers = [];
    }

    public addObserver(obs: () => void): void {
        this.observers.push(obs);
    }

    public triggerEvent(): void {
        for (const obs of this.observers) {
            obs();
        }
    }

    public clear(): void {
        this.observers = [];
    }
};
