interface WordScore {
    word: string;
    score: number;
    time: number;
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
    
    public addScore(word: string, score: number, time: number) {
        this.result.push({word, score, time});
    }
    
    public get totalScore(): number {
        let total: number = 0;
        
        for (let wordScore of this.result) {
            total += wordScore.score;
        }
        
        return total;
    }
    
    public get totalTime(): number {
        let total: number = 0;
        
        for (let wordScore of this.result) {
            total += wordScore.time;
        }
        
        return total;
    }
    
    public setFromBackend() {
        //todo
    }
    
}