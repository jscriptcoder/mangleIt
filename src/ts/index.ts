/// <reference path="./typings/angularjs/angular.d.ts" />
/// <reference path="./typings/angular-ui-router/angular-ui-router.d.ts" />

import MangleItFactory from './components/mangle-it/mangle-it-directive';
import HighscoreFactory from './components/highscore/highscore-directive';

export const APP_NAME: string = 'mangleIt'

// creates application
export const mangleItApp = angular.module(APP_NAME, ['ui.router']);

mangleItApp

    .directive('mangleIt', MangleItFactory)
    .directive('highscore', HighscoreFactory)

    .config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
    
        $stateProvider
            .state('index', {
                url: '',
                template: '<mangle-it></mangle-it>'
            })
            .state('highscore', {
                url: '/highscore',
                template: '<highscore></highscore>'
            })
    
    }]);

// manual bootstrapping
angular.bootstrap(document, [APP_NAME]);