import User from './user';

/**
 * Simple list of users sorted desc by their score
 */
export default class Highscore {
    
    public static factory(firebase: Firebase, users: User[] = []): Highscore {
        return new Highscore(firebase, users);
    }
    
    private _firebase: Firebase;
    private _users: User[];
    private _usersPromise: Promise<User[]>;
    
    constructor(firebase: Firebase, users: User[] = []) {
        this._firebase = firebase;
        this._users = users;
        
        this._usersPromise = this.requestUsersToFirebase();
    }
    
    public addUsers(users: User[]) {
        this._users = users;
    }
    
    public addUser(user: User) {
        this._users.push(user);
    }
    
    /**
     * Returns the list of users and their scores sorted desc by totalScore
     */
    public get highscore(): User[] {
        
        if (this.hasUsers) {
            // let's sort it (I know, this is quite slow, and I could use a binary search
            // to insert into a sorted array in the "addUser" method, but... I'm lazy today :-P)
            return this._users.sort((user1: User, user2: User) => {
                const scoreUser1 = user1.totalScore;
                const scoreUser2 = user2.totalScore;
                return scoreUser1 === scoreUser2 ? 0 : (scoreUser1 < scoreUser2 ? 1 : -1);
            });            
        }
        
    }
    
    public get users(): User[] {
        return this._users;
    }
    
    public get hasUsers(): boolean {
        return !!(this._users && this._users.length);
    }
    
    public onUsers(): Promise<User[]> {
        return this._usersPromise;
    }
    
    private requestUsersToFirebase(): Promise<User[]> {
        let usersRef = this._firebase.child('users');

        return new Promise((resolve: Function, reject: Function) => {

            usersRef.once('value', (dataSnapshot: FirebaseDataSnapshot) => {
                let val = dataSnapshot.val();
                if (val) {
                    this._users = this.processData(val);
        
                    console.log('Users retrieved from backend:', this._users);
        
                    resolve(this._users);
                } else {
                    reject();
                }
            });

        });
    }
    
    private processData(data: Object): User[] {
        let users: User[] = [];
        
        for (let key of Object.keys(data)) {
            users.push(this.makeUserFromObject(JSON.parse(data[key])));
        }
        
        return users;
    }

    /**
     * Creates an User instance from a plain object
     */
    private makeUserFromObject(userObj: any): User {
        let user: User = new User(userObj.name);
        let result: any[] = userObj.result;
        
        for (let res of result) {
            user.addScore({
                word: res.word,
                points: res.points,
                neg: res.neg,
                score: res.score,
                time: res.time
            });
        }
        
        return user;
    }
    
}