import Countdown from '../models/countdown';

/**
 * Service provider of Countdown
 */
export default class CountdownProvider implements ng.IServiceProvider {
    
    private _timeout: number;
    
    public set timeout(timeout: number) {
        this._timeout = timeout;
    }
    
    public $get = (): Countdown => {
        return new Countdown(this._timeout);
    }
}