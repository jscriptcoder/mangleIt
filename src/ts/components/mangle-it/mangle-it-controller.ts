// Models
import Countdown from '../../models/countdown';
import User from '../../models/user';
import MangleIt from '../../models/mangle-it';

export default class MangleItController {
    
    protected static $inject = ['$scope', 'countdown', 'firebase', 'user'];
    
    public enterNameForm: ng.IFormController;
    public model: MangleIt;
    
    private $scope: ng.IScope;
    private currMangledWord: string[];
    
    constructor($scope: ng.IScope, countdown: Countdown, firebase: Firebase, user: User) {
        this.$scope = $scope;
        this.model = MangleIt.factory(countdown, firebase, user);
    }
    
    public get isGameOn(): boolean {
        return this.model.isGameOn;
    }
    
    public invalidUsername(): boolean {
        return !this.enterNameForm.$pristine && this.enterNameForm.$invalid;
    }
    
    public pristineInput(): boolean {
        return this.enterNameForm.$pristine;
    }
    
    public beginClick() {
        if (!this.pristineInput() && !this.invalidUsername()) {
            this.model.gameOn = true;
            this.model.onWords().then(this.onWords.bind(this));
        }
    }
    
    public get mangledWord(): string {
        return this.currMangledWord ? this.currMangledWord[0] : ''; // returns the mangled one
    }
    
    private getNextMangledWord() {
        this.currMangledWord = this.model.getNextMangledWord();
    }
    
    private onWords() {
        this.$scope.$apply(() => {
            if (!this.mangledWord) this.getNextMangledWord();
        });
    }
    
}