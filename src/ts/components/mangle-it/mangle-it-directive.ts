import MangleItController from './mangle-it-controller';

export default function MangleItFactory(): ng.IDirective {
    
    return {
        controller: MangleItController,
        controllerAs: 'mangleItCtrl',
        replace: true,
        restrict: 'E',
        templateUrl: 'mangle-it.html',
    };
    
}