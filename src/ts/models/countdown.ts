/// <reference path="../typings/es6-promise/es6-promise.d.ts" />

/**
 * Very simple countdown with just a "start" method
 * We could improve it by adding "stop", "pause" and reset methods
 * 
 * @requires Promise
 */
export default class Countdown {
    
    private _timeout: number;
    
    constructor(timeout: number = 40) {
        this._timeout = timeout;
    }
    
    public start(): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            setTimeout(resolve, this._timeout);
        });
    }
}