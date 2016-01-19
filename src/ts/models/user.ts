interface WordScore {
    word: string;
    points: number;
    neg: number;
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
    
    constructor(name: string = '') {
        this.name = name;
        this.result = [];
    }
    
    public addScore(wordScore: WordScore) {
        this.result.push(wordScore);
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
    
    /**
     * In here we accumulate all the negative points
     */
    public decreaseOnePoint(pos: string | number) {
        if (this.result.length) {

            if (typeof pos === 'string') {
                switch (pos) {
                    case 'first': 
                        this.decreaseOnePoint(0);
                        break;
                    case 'last': 
                        this.decreaseOnePoint(this.result.length - 1); 
                        break;
                }
            } else if (typeof pos === 'number' && pos >= 0 && pos < this.result.length) {
                this.result[pos].neg++;
            }
        }
    }
    
    /**
     * score = points - neg ==> >= 0
     */
    public addPoints(pos: string | number) {
        if (this.result.length) {
            
            if (typeof pos === 'string') {
                switch (pos) {
                    case 'first': 
                        this.addPoints(0);
                        break;
                    case 'last': 
                        this.addPoints(this.result.length - 1);
                        break;
                }
            } else if (typeof pos === 'number' && pos >= 0 && pos < this.result.length) {
                this.result[pos].score = this.result[pos].points -  this.result[pos].neg;
                if (this.result[pos].score < 0) this.result[pos].score = 0;
            }
            
        }
    }
    
}