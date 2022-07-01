//class GuessNumber
//holds the state of the number to guess
//method to instantiate a new number to guess
//method to check if a guess is correct
import DisplayStopwatch from './UtilClasses/DisplayStopwatch.js';
import GuessNumber from './UtilClasses/GuessNumber.js';

const guessInput = document.querySelector("#guessInput");
const fireworksImage = document.querySelector("#fireworksImage");
const userPromptText = document.querySelector("#userPromptText");
const restartButton = document.querySelector("#restartButton");
const giveUpButton = document.querySelector("#giveUpButton");
const pastGuessesList = document.querySelector("#pastGuessesList");
const probabilityPercentage = document.querySelector("#probabilityPercentage");
const probabilityText = document.querySelector("#probabilityText");
const rightSide = document.querySelector("#rightSide");

const guess = new GuessNumber();
const displayStopWatch = new DisplayStopwatch(rightSide, 0);
let pastGuesses = [];
let currentRangeMax = guess.max;
let currentRangeMin = 1;
renderProbability(currentRangeMin, currentRangeMax);

restartButton.addEventListener('click', () => initGame(1, 200));
giveUpButton.addEventListener('click', () => endGame(false));
guessInput.addEventListener('keyup', (e) => handleInput(e));

userPromptText.textContent = `Guess a number between ${guess.min} and ${guess.max}`;
let isPlaying = true;
restartButton.hidden = true;

function initGame(min, max){
    guess.setGuess(min, max);
    currentRangeMax = guess.max;
    currentRangeMin = guess.min;
    userPromptText.textContent = `Guess a number between ${guess.min} and ${guess.max}`;
    fireworksImage.hidden = true;
    isPlaying = true;
    guessInput.hidden = false;
    giveUpButton.hidden = false;
    renderPastGuesses();
    renderProbability(currentRangeMin, currentRangeMax);
    displayStopWatch.togglePause();
    restartButton.hidden = true;
}

function handleInput(event){
    if (isPlaying){
        const code = event.code;
        if (code === 'Enter' || code === 'NumpadEnter'){
            let val = parseInt(event.target.value);
            if (!isNaN(val)){
                handleGuess(event.target.value);
                event.target.value = null;
            }
        }
    }else{
        event.target.value = null;
    }
}

function handleGuess(number){
    let guessResult = guess.checkGuess(number);
    let textResult = "";
    switch(guessResult){
        case GuessNumber.LOWER:
            if (currentRangeMax > parseInt(number)) currentRangeMax = number;
            textResult = "Lower";
            break;
        case GuessNumber.MATCH:
            textResult = "Correct";
            endGame(true);
            break;
        case GuessNumber.HIGHER:
            if (currentRangeMin < parseInt(number)) currentRangeMin = number;
            textResult = "Higher";
            break;
    }
    //update the user prompt
    userPromptText.textContent = `${textResult}${isPlaying? "...":"! Congratulations"}`;

    if (isPlaying){
        //Add a new guess to the past guesses list
        pastGuesses.push({
            guessIndex:number,
            text:textResult
        });
        renderPastGuesses();
        //Update the player's next guess probability
        renderProbability(currentRangeMin, currentRangeMax);
    }
}

function renderPastGuesses(){
    //remove all the li elements
    for (let item of Array.from(pastGuessesList.children)){
        if (item.tagName == "LI"){
            item.remove();
        }
    }
    for (let i = 0; i < pastGuesses.length; i++){
        let newLi = document.createElement("li");
        newLi.textContent = `${pastGuesses[i].text} than ${pastGuesses[i].guessIndex}`;
        pastGuessesList.appendChild(newLi);
    }
    
}

function renderProbability(min, max){
    let fractionText = `1 in ${max-min}`;
    let chance = Math.round(1/(max-min)*100);
    
    let probabilityFlavorText = "";
    if (chance < 3){
        probabilityFlavorText = "Needle in a Haystack";
    }else if (chance < 8){
        probabilityFlavorText = "Shot in the Dark";
    }else if (chance < 15){
        probabilityFlavorText = "Strange Occurence";
    }else if (chance < 25){
        probabilityFlavorText = "Uncommon";
    }else if (chance < 40){
        probabilityFlavorText = "Common";
    }else{
        probabilityFlavorText = "Likely";
    }

    probabilityPercentage.textContent = `${probabilityFlavorText}  ${chance}%`;
    probabilityText.textContent = `You have a ${fractionText} chance of guessing correctly`;
}

function endGame(playerWon){
    displayStopWatch.togglePause();

    if (playerWon){
        fireworksImage.hidden = false;
        userPromptText.textContent = "You found the number! Congratulations!\n";
    }else{
        userPromptText.textContent = `Not this time. The number was ${guess.revealNumber()}`;
    }

    isPlaying = false;
    guessInput.value = null;
    restartButton.hidden = false;
    giveUpButton.hidden = true;
    guessInput.hidden = true;
    pastGuesses = [];
}