/**
 * Very simple countdown with just a "start" method
 * We could improve it by adding "stop", "pause" and "reset" methods
 * 
 * @requires Promise
 */
export default class Countdown {
    
    private _timeout: number; // in seconds
    private _on: boolean = false;
    
    constructor(timeout: number = 60) {
        this._timeout = timeout;
    }
    
    public start(): Promise<any> {
        this._on = true;
        return new Promise((resolve: Function, reject: Function) => {
            setTimeout(() => {
                this._on = false;
                resolve();
            }, this._timeout * 1000);
        });
    }

    public get isOn(): boolean {
        return this._on;
    }

    public get timeout(): number {
        return this._timeout;
    }
}