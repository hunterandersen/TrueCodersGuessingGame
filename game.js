//class GuessNumber
//holds the state of the number to guess
//method to instantiate a new number to guess
//method to check if a guess is correct


//class GuessingGame
//holds a GuessNumber
//prompts for input

import GuessNumber from './GuessNumber.js'

const guess = new GuessNumber();
guess.setGuess(35);

const guessInput = document.querySelector("#guessInput");
guessInput.addEventListener('keydown', (e) => handleInput(e));

console.log(guessInput);

function handleInput(event){
    console.log('KeyDown');
    const code = event.code;
    console.log(code);
    if (code === 'Enter' || code === 'NumpadEnter'){
        let currentValue = event.target.value;
        console.log(currentValue);
        handleGuess(event.target.value);
        event.target.value = null;
    }
}

function handleGuess(number){
    console.log(`Handling guess ${number}`);
}