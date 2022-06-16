//class GuessNumber
//holds the state of the number to guess
//method to instantiate a new number to guess
//method to check if a guess is correct
import GuessNumber from './GuessNumber.js'

const guess = new GuessNumber();

const guessInput = document.querySelector("#guessInput");
const fireworksImage = document.querySelector("#fireworksImage");
const userPromptText = document.querySelector("#userPromptText");
const restartButton = document.querySelector("#restartButton");

restartButton.addEventListener('click', () => initGame());
guessInput.addEventListener('keyup', (e) => handleInput(e));

userPromptText.textContent = `Guess a number between ${guess.min} and ${guess.max}`;
let isPlaying = true;

function initGame(){
    guess.setGuess(1, 200);
    userPromptText.textContent = `Guess a number between ${guess.min} and ${guess.max}`;
    fireworksImage.hidden = true;
    isPlaying = true;
}

function handleInput(event){
    if (isPlaying){
        const code = event.code;
        if (code === 'Enter' || code === 'NumpadEnter'){
            handleGuess(event.target.value);
            event.target.value = null;
        }
    }else{
        event.target.value = null;
    }
}

function handleGuess(number){
    let guessResult = guess.checkGuess(number);
    switch(guessResult){
        case -1:
            userPromptText.textContent = "Lower...";
            break;
        case 0:
            userPromptText.textContent = "";
            victory();
            break;
        case 1:
            userPromptText.textContent = "Higher...";
            break;
    }
}

function victory(){
    isPlaying = false;
    fireworksImage.hidden = false;
    userPromptText.textContent = "You found the number! Congratulations!\n";
}
