import HighscoreController from './highscore-controller';

export default class HighscoreDirective implements ng.IDirective {
    
    public static factory(): HighscoreDirective {
        return new HighscoreDirective();
    }
    
    public controller = HighscoreController;
    public controllerAs = 'highscoreCtrl';
    public replace = true;
    public restrict = 'E';
    public templateUrl = 'templates/highscore.html';
    
}