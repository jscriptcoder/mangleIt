import CountdownController from './countdown-controller';

export default class CountdownDirective implements ng.IDirective {
    
    public static factory(): CountdownDirective {
        return new CountdownDirective();
    }
    
    public controller = CountdownController;
    public controllerAs = 'countdownCtrl';
    public replace = true;
    public restrict = 'E';
    public templateUrl = 'templates/countdown.html';
    public scope = {
        timeout: '@',
        onEnd: '&'
    };
    
}