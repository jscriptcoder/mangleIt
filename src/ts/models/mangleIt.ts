/// <reference path="../typings/firebase/firebase.d.ts" />

import Countdown from './countdown';
import User from './user';

export default class MangleIt {
    
    private _user: User;
    private _countdown: Countdown;
    private _backend: Firebase;
    
    constructor(countdown: Countdown, firebase: Firebase) {
        this._countdown = countdown;
        this._backend = firebase;
    }
    
}