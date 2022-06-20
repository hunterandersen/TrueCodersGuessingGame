//class GuessNumber
//holds the state of the number to guess
//method to instantiate a new number to guess
//method to check if a guess is correct
import DisplayStopwatch from './UtilClasses/DisplayStopwatch.js';
import GuessNumber from './UtilClasses/GuessNumber.js'

const guessInput = document.querySelector("#guessInput");
const fireworksImage = document.querySelector("#fireworksImage");
const userPromptText = document.querySelector("#userPromptText");
const restartButton = document.querySelector("#restartButton");
const pastGuessesList = document.querySelector("#pastGuessesList");

const guess = new GuessNumber();
const displayStopWatch = new DisplayStopwatch(pastGuessesList, 0);
let pastGuesses = [];

restartButton.addEventListener('click', () => initGame());
guessInput.addEventListener('keyup', (e) => handleInput(e));

userPromptText.textContent = `Guess a number between ${guess.min} and ${guess.max}`;
let isPlaying = true;

function initGame(){
    guess.setGuess(1, 200);
    userPromptText.textContent = `Guess a number between ${guess.min} and ${guess.max}`;
    fireworksImage.hidden = true;
    isPlaying = true;
    guessInput.hidden = false;
    renderPastGuesses();
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
    let textResult = "";
    switch(guessResult){
        case -1:
            textResult = "Lower";
            break;
        case 0:
            textResult = "Correct";
            victory();
            break;
        case 1:
            textResult = "Higher";
            break;
    }
    //update the user prompt
    userPromptText.textContent = `${textResult}${isPlaying? "...":"! Congratulations"}`;

    //Add a new guess to the past guesses list
    pastGuesses.push({
        guessIndex:number,
        text:textResult
    });
    if (isPlaying) renderPastGuesses();
}

function renderPastGuesses(){
    //remove all the li elements
    for (let item of Array.from(pastGuessesList.children)){
        console.log(item);
        if (item.tagName == "LI"){
            item.remove();
        }
    }
    for (let i = 0; i < pastGuesses.length; i++){
        let newLi = document.createElement("li");
        newLi.textContent = `${i+1}: ${pastGuesses[i].text} than ${pastGuesses[i].guessIndex}`;
        pastGuessesList.appendChild(newLi);
    }
    
}

function victory(){
    isPlaying = false;
    guessInput.hidden = true;
    fireworksImage.hidden = false;
    pastGuesses = [];
    userPromptText.textContent = "You found the number! Congratulations!\n";
}
