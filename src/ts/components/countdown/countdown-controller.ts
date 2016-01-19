interface CountdownDirectiveScope extends ng.IScope {
    timeout: string;
    onEnd?: Function;
}

export default class CountdownController {
    
    protected static $inject = ['$scope'];
    
    private $scope: CountdownDirectiveScope;
    private _timeout: number;
    private _onEnd: Function;
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
    
    private initTimer() {
        let timer = 0;
        let interval = setInterval(() => {
            
            if (timer === this._timeout) {
                clearInterval(interval);
                this._onEnd();
            } else {
                this.$scope.$apply(() => {
                    timer++;
                    this._digits = this.makeDigitsFromNumber(timer);
                });
            }
            
        }, 1000);
    }
    
    private makeDigitsFromNumber(val: number): string[] {
        let strVal = (val < 9 ? '0' : '') + `${val}`; // converts to string appending '0' if < 9
        return strVal.split(''); // converts to string[]
    }
    
}