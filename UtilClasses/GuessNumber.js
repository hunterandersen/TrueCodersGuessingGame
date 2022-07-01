class GuessNumber{
    #numberToFind;
    static LOWER = -1;
    static HIGHER = 1;
    static MATCH = 0;

    /**
     * 
     * @param {Number} min "The hidden number to be guessed OR the minimum value in the guess range"
     * @param {Number} max "Maximum value in the guess range"
     */
    constructor(min, max){
        this.setGuess(min, max);
    }

    //takes a Number guess
    //returns 1 if the guess is lower than the number to find
    //returns -1 if the guess is higher than the number to find
    //returns 0 if the two numbers match
    //returns null if the input number is nullish (NaN)
    checkGuess(attempt){
        if (!attempt && attempt != -1) return null;
        if (attempt < this.#numberToFind){
            return GuessNumber.HIGHER;
        }else if (attempt > this.#numberToFind){
            return GuessNumber.LOWER;
        }else{
            return GuessNumber.MATCH;
        }
    }

    //create a new number to be found
    setGuess(number, max){
        if (max){
            this.min = number;
            this.max = max;
        } else if (number){
            this.max = (Math.floor(number/100)+1)*100;
            this.min = 1;
        } 
        else{
            this.min = 1;
            this.max = 100;
        }
        if (!max && number){
            this.#numberToFind = number;
        }else{
            this.#numberToFind = Math.floor(Math.random() * this.max) + this.min;
        }
    }

    //get the number
    revealNumber(){
        return this.#numberToFind;
    }
}

export default GuessNumber;