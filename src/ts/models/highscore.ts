import User from './user';

/**
 * Simple list of users sorted desc by their score
 */
export default class Highscore {
    
    private _users: User[];
    
    constructor(users: User[] = []) {
        this._users = users;
    }
    
    public addUsers(users: User[]) {
        this._users = users;
    }
    
    public addUser(user: User) {
        this._users.push(user);
    }
    
    public get highscore(): User[] {
        
        // let's sort it (I know, this is quite slow, and I could use a binary search
        // to insert into a sorted array in the "addUser" method, but... I'm lazy today :-P)
        return this._users.sort((user1: User, user2: User) => {
            const scoreUser1 = user1.totalScore;
            const scoreUser2 = user2.totalScore;
            return scoreUser1 === scoreUser2 ? 0 : (scoreUser1 < scoreUser2 ? 1 : -1);
        });
        
    }
    
}