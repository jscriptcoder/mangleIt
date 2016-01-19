// Models
import Countdown from '../../models/countdown';
import User from '../../models/user';
import MangleIt from '../../models/mangle-it';

export default class MangleItController {
    
    protected static $inject = ['countdown', 'firebase', 'user'];
    
    public enterNameForm: ng.IFormController;
    
    public model: MangleIt;
    
    constructor(countdown: Countdown, firebase: Firebase, user: User) {
        this.model = MangleIt.factory(countdown, firebase, user);
    }
    
    public get isGameOn(): boolean {
        return this.model.isGameOn;
    }
    
    public invalidUsername(): boolean {
        return !this.enterNameForm.$pristine && this.enterNameForm.$invalid;
    }
    
    public noName(): boolean {
        return this.enterNameForm.$pristine;
    }
    
    public beginClick() {
        if (!this.noName() && !this.invalidUsername()) {
            this.model.gameOn = true;
        }
    }
    
}