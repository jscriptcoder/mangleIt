/// <reference path="../typings/firebase/firebase.d.ts" />

/**
 * Service provider of Firebase
 */
export default class FirebaseProvider implements ng.IServiceProvider {
    
    private _url: string;
    
    public set url(url: string) {
        this._url = url;
    }
    
    public $get = (): Firebase => {
        return new Firebase(this._url);
    }
}