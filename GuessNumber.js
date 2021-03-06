class GuessNumber{
    #numberToFind;
    constructor(number, max){
        this.setGuess(number, max);
    }

    //takes a Number guess
    //returns 1 if the guess is lower than the number to find
    //returns -1 if the guess is higher than the number to find
    //returns 0 if the two numbers match
    //returns null if the input number is nullish (NaN)
    checkGuess(attempt){
        if (!attempt && attempt != -1) return null;
        if (attempt < this.#numberToFind){
            return 1;
        }else if (attempt > this.#numberToFind){
            return -1;
        }else{
            return 0;
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
}

export default GuessNumber;