// Models
import Countdown from '../../models/countdown';
import User from '../../models/user';
import MangleIt from '../../models/mangle-it';

const ENTER: number = 13;
const BACKSPACE: number = 8;

export default class MangleItController {
    
    protected static $inject = [
        '$scope', 
        '$timeout', 
        '$state', 
        'countdown', 
        'firebase', 
        'user'
    ];
    
    public enterNameForm: ng.IFormController;
    public model: MangleIt;
    
    public enteredWord: string = '';
    public wrongWord: boolean = false;
    
    private $scope: ng.IScope;
    private $timeout: ng.ITimeoutService;
    private $state: ng.ui.IStateService;
    
    constructor($scope: ng.IScope, 
                $timeout: ng.ITimeoutService, 
                $state: ng.ui.IStateService, 
                countdown: Countdown, 
                firebase: Firebase, 
                user: User) {
        
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$state = $state;
        
        this.model = MangleIt.factory(countdown, firebase, user);
        
    }
    
    public get isGameOn(): boolean {
        return this.model.isGameOn;
    }
    
    public get isGameOver(): boolean {
        return this.model.isGameOver;
    }
    
    public get isLoadingWords(): boolean {
        return this.isGameOn && !this.isGameOver && !this.model.mangledWord;
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
            
            // subscribes to onWords event (we have words from backend)
            this.model.onWords().then(this.onWords.bind(this));
        }
    }
    
    public onKeydown($event: KeyboardEvent) {
        switch ($event.keyCode) {
            case ENTER:
                
                if (this.enteredWord === this.model.unmangledWord) {
                    this.scoreAndMoveToNext();
                } else {
                    this.showWrongWordError(2); // will show error message for 2 seconds
                }
                
                break;
            case BACKSPACE:
                if (this.enteredWord.length) {
                    // oops, we remove one point
                    this.model.substractOnePointFromParticipant();
                }
                break;
        }
    }
    
    public submitClick() {
        this.model.submitScore();
        this.$state.go('highscore');
    }
    
    public onCountdownEnd() {
        this.$scope.$apply();
    }
    
    private onWords() {
        this.$scope.$apply(() => {
            // if we have words we kick off the game
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