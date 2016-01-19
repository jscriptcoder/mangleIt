// Models
import Countdown from '../../models/countdown';
import User from '../../models/user';
import MangleIt from '../../models/mangle-it';

const ENTER: number = 13;
const BACKSPACE: number = 8;

export default class MangleItController {
    
    protected static $inject = ['$scope', '$timeout', 'countdown', 'firebase', 'user'];
    
    public enterNameForm: ng.IFormController;
    public model: MangleIt;
    
    public enteredWord: string = '';
    public wrongWord: boolean = false;
    
    private $scope: ng.IScope;
    private $timeout: ng.ITimeoutService;
    
    constructor($scope: ng.IScope, $timeout: ng.ITimeoutService, countdown: Countdown, firebase: Firebase, user: User) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        
        this.model = MangleIt.factory(countdown, firebase, user);
        
        // let's install a watcher to updatate the current score
        this.$scope.$watch(() => this.enteredWord, (val) => {
            
        });
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
    
    public startClick() {
        if (!this.pristineInput() && !this.invalidUsername()) {
            this.model.gameOn = true;
            this.model.onWords().then(this.onWords.bind(this));
        }
    }
    
    public onKeydown($event: KeyboardEvent) {
        switch ($event.keyCode) {
            case ENTER:
                
                if (this.enteredWord === this.model.unmangledWord) {
                    this.scoreAndMoveToNext();
                } else {
                    this.showWrongWordError(5); // will show error message for 5 seconds
                }
                
                break;
            case BACKSPACE:
                if (this.enteredWord.length) {
                    this.model.substractOnePointFromParticipant();
                }
                break;
        }
    }
    
    private onWords() {
        this.$scope.$apply(() => {
            if (!this.model.mangledWord) this.model.start();
        });
    }
    
    private showWrongWordError(seconds: number) {
        this.wrongWord = true;
        this.$timeout(() => this.wrongWord = false, seconds * 1000);
    }
    
    private scoreAndMoveToNext() {
        this.model.addPointsToParticipant();
        this.enteredWord = '';
        this.model.getNextMangledWord();
    }
    
}