/// <reference path="../typings/mangle-it.d.ts" />

import Countdown from './countdown';
import User from './user';

export default class MangleIt {
    
    /**
     * The reason for this static method is to make it easy to monkeypatch and return a mock
     */
    public static factory(countdown: Countdown, firebase: Firebase, user?: User): MangleIt {
        return new MangleIt(countdown, firebase, user);
    }
    
    private _countdown: Countdown;
    private _firebase: Firebase;
    private _user: User;
    private _gameOn: boolean = false;
    private _words: string[] = [];
    private _wordsPromise: Promise<string[]>;
    private _idxCurrentWord: number = 0;
    
    constructor(countdown: Countdown, firebase: Firebase, user?: User) {
        this._countdown = countdown;
        this._firebase = firebase;
        this._user = user; // could be set later on
        
        this._wordsPromise = this.requestWordsToFirebase();
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
    
    public onWords(): Promise<string[]> {
        return this._wordsPromise;
    }
    
    public get words(): string[] {
        return this._words;
    }

    public get totalScoreParticipant(): number {
        return this.user.totalScore;
    }
    
    public getNextMangledWord(): string[] {
        if (this._idxCurrentWord < this._words.length) {
            
            const nextWord = this._words[this._idxCurrentWord++];
            const mangledWord = this.mangleWord(nextWord);
            
            return [mangledWord, nextWord]; // returns the mangled and original one
            
        } else {
            // we went through the whole list. TODO
        }
    }

    private shuffleWords(words: string[]) {
        let shuffleWords = [],
            wordIndex = 0;

        while (words.length > 0) {
            wordIndex = Math.floor(Math.random() * words.length);
            shuffleWords.push(words[wordIndex]);
            words.splice(wordIndex, 1);
        }

        return shuffleWords;
    }
    
    private mangleWord(word: string): string {
        let mangledWord = '',
            charIndex = 0,
            arrWord = word.split(''); // converts into string[]
        
        while (arrWord.length > 0) {
            charIndex = Math.floor(Math.random() * arrWord.length);
            mangledWord += arrWord[charIndex];
            arrWord.splice(charIndex, 1);
        }
        
        return mangledWord;
    }
    
    private requestWordsToFirebase(): Promise<string[]> {
        let wordsRef = this._firebase.child('words');

        return new Promise((resolve: Function, reject: Function) => {

            wordsRef.once('value', (dataSnapshot: FirebaseDataSnapshot) => {
                let val = dataSnapshot.val();
                if (val) {
                    this._words = this.shuffleWords(val.split(','));
                    console.log(this._words);
                    resolve(this._words);
                } else {
                    reject();
                }
            });

        });
    }
    
}