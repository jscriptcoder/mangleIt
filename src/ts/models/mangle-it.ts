/// <reference path="../typings/firebase/firebase.d.ts" />

import Countdown from './countdown';
import User from './user';

export default class MangleIt {
    
    /**
     * The reason for this static method is to make it easy to monkeypatch and return a mock
     */
    public static factory(countdown: Countdown, firebase: Firebase, user?: User): MangleIt {
        return new MangleIt(countdown, firebase, user);
    }
    
    private _user: User;
    private _countdown: Countdown;
    private _firebase: Firebase;
    private _gameOn: boolean;
    
    constructor(countdown: Countdown, firebase: Firebase, user?: User) {
        this._countdown = countdown;
        this._firebase = firebase;
        this._user = user; // could be set later on
    }
    
    public set user(user: User) {
        this._user = user;
    }
    
    public get user(): User {
        return this._user;
    }
    
    public set gameOn(isOn: boolean) {
        this._gameOn = isOn;
    }
    
    public get isGameOn(): boolean {
        return this._gameOn;
    }
    
}