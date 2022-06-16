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
const fireworksImage = document.querySelector("#fireworksImage");
const userPromptText = document.querySelector("#userPromptText");
const restartButton = document.querySelector("#restartButton");
console.log(restartButton);
restartButton.addEventListener('click', () => initGame());

let isPlaying = true;
guessInput.addEventListener('keyup', (e) => handleInput(e));

function initGame(){
    console.log('Button pressed');
    guess.setGuess(1, 200);
    userPromptText.textContent = "Guess a number";
    fireworksImage.hidden = true;
}

function handleInput(event){
    if (isPlaying){
        const code = event.code;
        if (code === 'Enter' || code === 'NumpadEnter'){
            let currentValue = event.target.value;
            console.log(currentValue);
            handleGuess(event.target.value);
            event.target.value = null;
        }
    }else{
        event.target.value = null;
    }
}

function handleGuess(number){
    console.log(`Handling guess ${number}`);
    let guessResult = guess.checkGuess(number);
    switch(guessResult){
        case -1:
            guessInput.value = "Higher...";
            break;
        case 0:
            guessInput.value = "";
            victory();
            break;
        case 1:
            guessInput.value = "Lower...";
            break;
    }
}

function victory(){
    isPlaying = false;
    fireworksImage.hidden = false;
    userPromptText.textContent = "You found the number! Congratulations!\n";
}
