
interface WordScore {
    word: string;
    score: number;
}

/**
 * Basic model to store info about the user and his/her score.
 * This will be store as it is in firebase.
 */
export default class User {

    public name: string;
    public result: WordScore[];
    
    constructor(name: string) {
        this.name = name;
        this.result = [];
    }
    
    public addScore(word: string, score: number) {
        this.result.push({word, score});
    }
    
}