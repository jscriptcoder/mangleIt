import MangleItController from './mangle-it-controller';

export default class MangleItDirective implements ng.IDirective {
    
    public static factory(): MangleItDirective {
        return new MangleItDirective();
    }
    
    public controller = MangleItController;
    public controllerAs = 'mangleItCtrl';
    public replace = true;
    public restrict = 'E';
    public templateUrl = 'templates/mangle-it.html';
    
}