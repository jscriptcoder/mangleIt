interface CountdownDirectiveScope extends ng.IScope {
    timeout: string;
    onEnd?: Function;
}

export default class CountdownController {
    
    protected static $inject = ['$scope'];
    
    private $scope: CountdownDirectiveScope;
    
    private _timeout: number;
    private _onEnd: Function;
    private _currTime: number = 0;
    private _digits: string[] = ['0', '0'];
    
    constructor($scope: CountdownDirectiveScope) {
        this.$scope = $scope;
        
        this._timeout = parseInt($scope.timeout, 10);
        this._onEnd = $scope.onEnd || angular.noop;

        this.initTimer();
    }
    
    public get digits(): string[] {
        return this._digits;
    }
    
    /**
     * Will change the color of the clock depending according to the following
     *   up to 50% ==> ok
     *   50% - 90% ==> warning
     *   +90% ==> danger
     */
    public getClassByTime(): string {
        let percentage = this._currTime * 100 / this._timeout;
        if (percentage <= 50) {
            return 'ok';
        } else if (percentage > 50 && percentage <= 90) {
            return 'warning';
        } else {
            return 'danger';
        }
    }
    
    private initTimer() {
        let interval = setInterval(() => {
            
            if (this._currTime === this._timeout) {
                clearInterval(interval);
                this._onEnd();
            } else {
                // next tick
                this.$scope.$apply(() => {
                    this._currTime++;
                    this._digits = this.makeDigitsFromNumber(this._currTime);
                });
            }
            
        }, 1000);
    }
    
    /**
     * Turns x or xx into 'xx'
     */
    private makeDigitsFromNumber(val: number): string[] {
        let strVal = (val <= 9 ? '0' : '') + `${val}`; // converts to string appending '0' if <= 9
        return strVal.split(''); // converts to string[]
    }
    
}