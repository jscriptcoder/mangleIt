import User from '../../models/user';
import Highscore from '../../models/highscore';

export default class HighscoreController {
    
    protected static $inject = ['$scope', 'firebase'];
    
    public model: Highscore;
    
    private $scope: ng.IScope;
    
    constructor($scope: ng.IScope, firebase: Firebase) {
        this.$scope = $scope;
        this.model = Highscore.factory(firebase);
        
        // subscribes to onUsers event (we have users' scores from backend)
        this.model.onUsers().then(this.onUsers.bind(this));
    }
    
    private onUsers(users: User[]) {
        this.$scope.$apply();
    }
    
}