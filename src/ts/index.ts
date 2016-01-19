/***************
 * ENTRY POINT *
 ***************/

/// <reference path="./typings/mangle-it.d.ts" />

// imports all the configuration constants
import * as config from './config';

// Models
import User from './models/user';
import Highscore from './models/highscore';

// Services
import FirebaseProvider from './services/firebase-provider';
import CountdownProvider from './services/countdown-provider';

// Directive components
import MangleItDirective from './components/mangle-it/mangle-it-directive';
import CountdownDirective from './components/countdown/countdown-directive';
import HighscoreDirective from './components/highscore/highscore-directive';

// creates application
export const mangleItApp = angular.module(config.APP_NAME, ['ui.router']);

// registration of services, components and initial configuration
mangleItApp

    // Providers
    .provider('firebase', FirebaseProvider)
    .provider('countdown', CountdownProvider)

    // Services
    .value('user', new User())
    .value('highscore', new Highscore())

    // components
    .directive('mangleIt', MangleItDirective.factory)
    .directive('countdown', CountdownDirective.factory)
    .directive('highscore', HighscoreDirective.factory)

    // configuration
    .config([
    
        '$stateProvider', 
        'firebaseProvider', 
        'countdownProvider',
    
        (
            $stateProvider: ng.ui.IStateProvider, 
            firebaseProvider: FirebaseProvider, 
            countdownProvider: CountdownProvider
        ) => {
            
            // configures routing
            $stateProvider
                .state('index', {
                    url: '',
                    template: '<mangle-it></mangle-it>'
                })
                .state('highscore', {
                    url: '/highscore',
                    template: '<highscore></highscore>'
                });
            
            // configures firebase url
            firebaseProvider.url = config.FB_URL;
            
            // configures countdown timeout
            countdownProvider.timeout = config.COUNT_TIMEOUT;
    
    }]);

// manual bootstrapping
angular.bootstrap(document, [config.APP_NAME]);