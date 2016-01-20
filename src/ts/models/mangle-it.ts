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
    private _gameOver: boolean = false;
    private _words: string[] = [];
    private _wordsPromise: Promise<string[]>;
    private _idxCurrentWord: number = 0;
    private _currMangledWord: string[];
    
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
    
    public set gameOver(isOver: boolean) {
        this._gameOver = isOver;
    }
    
    public start() {
        if (this._gameOn && !this._gameOver) {
            
            // subscribes to the end of the countdown
            this._countdown.start().then(this.onCountdownEnd.bind(this));
            
            this.getNextMangledWord();
        }
    }
    
    public get isGameOn(): boolean {
        return this._gameOn;
    }
    
    public get isGameOver(): boolean {
        return this._gameOver;
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
    
    /**
     * This method will bring the next word to the game
     */
    public getNextMangledWord(): string[] {
        if (this._gameOver || 
            !this._gameOn || 
            !this._countdown.isOn) return; // we cannot play the game
        
        if (this._idxCurrentWord < this._words.length) {
            
            const nextWord = this._words[this._idxCurrentWord++];
            const mangledWord = this.mangleWord(nextWord);
            
            this.user.addScore({
                word: nextWord,
                points: Math.floor(Math.pow(1.95, nextWord.length/3)), // as per spec: floor(1.95^(n/3))
                score: 0,
                neg: 0,
                time: 0
            });
            
            return this._currMangledWord = [mangledWord, nextWord]; // returns the mangled and original one
            
        } else {
            // todo: we went through the whole list. What happens now???
        }
    }
    
    public get mangledWord(): string {
        return this._currMangledWord ? this._currMangledWord[0] : ''; // returns the mangled one
    }
    
    public get hasMangledWord(): boolean {
        return !!this.mangledWord;
    }

    public get unmangledWord(): string {
        return this._currMangledWord ? this._currMangledWord[1] : ''; // returns the unmangled one
    }
    
    public addPointsToParticipant() {
        this.user.addPoints('last');
    }
    
    public substractOnePointFromParticipant() {
        this.user.decreaseOnePoint('last');
    }
    
    public get timeout(): number {
        return this._countdown.timeout;
    }
    
    public submitScore(): Promise<User[]> {
        let usersRef = this._firebase.child('users');

        return new Promise((resolve: Function, reject: Function) => {
            console.log('Sending to backend:', this._user);
            
            let serializedUser: string = JSON.stringify(this._user);

            usersRef.push(serializedUser, (error?: any) => {
                if (error) {
                    reject();
                } else {
                    resolve(this._user);
                }
            });

        });
    }
    
    /**
     * Magic crappy shuffling algorithm
     */
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
    
    /**
     * More magic crap happnening in here
     */
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
        
                    console.log('Words retrieved from backend:', this._words);
        
                    resolve(this._words);
                } else {
                    reject();
                }
            });

        });
    }
    
    private onCountdownEnd() {
        // resets values
        this._idxCurrentWord = 0;
        this._currMangledWord = [];
        
        // the game is over
        this._gameOver = true;
    }
    
}
