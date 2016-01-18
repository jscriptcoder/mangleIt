import HighscoreController from './highscore-controller';

export default function HighscoreFactory(): ng.IDirective {
    
    return {
        controller: HighscoreController,
        controllerAs: 'highscoreCtrl',
        replace: true,
        restrict: 'E',
        templateUrl: 'highscore.html',
    };
    
}