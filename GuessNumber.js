class GuessNumber{
    #numberToFind;
    constructor(number){
        this.#numberToFind = number || Math.floor(Math.random() * 100)+1;
        //Helpful output for testing
        console.log(`Number to find: ${this.#numberToFind}`);
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
    setGuess(number){
        this.#numberToFind = number || Math.floor(Math.random() * 100)+1;
        console.log(`New number to find: ${this.#numberToFind}`);
    }
}

export default GuessNumber;