let playerScore = 0;
let computerScore = 0;
const winningScore = 5;

const resultDisplay = document.querySelector("#result");
const ScoreDisplay = document.querySelector("#score");
const finalResultDisplay = document.querySelector("#final-result");

const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");

rockButton.addEventListener("click", ()=> playRound("Rock",computerPlay()));
paperButton.addEventListener("click", ()=> playRound("Paper",computerPlay()));
scissorsButton.addEventListener("click", ()=> playRound("Scissors",computerPlay()));

//Generate random computer choice.
function computerPlay(){
    let random3 = Math.floor((Math.random() * 3) + 1);
    switch (random3){
        case 1: return "Rock";
        case 2: return "Paper";
        case 3: return "Scissors";
    }
}

function playRound(playerSelection,computerSelection){
    //Check if player draws with computer
    if (playerSelection == computerSelection){
        printResult("draw",playerSelection,computerSelection);
        return;
    }
    //If not a draw, check if player wins or loses. 
    let result = "";
    switch (playerSelection){
        case "Rock":
            if (computerSelection == "Scissors"){
                result = "win";
            } else result = "lose";
            break;
        
        case "Paper":
            if (computerSelection == "Rock"){
                result = "win";
            } else result = "lose";
            break;

        case "Scissors":
            if (computerSelection == "Paper"){
                result = "win";
            } else result = "lose";
            break;
    }

    printResult(result, playerSelection, computerSelection);
    updateScore(result); 

    if (playerScore === winningScore){
        endGame("player wins")
    } else if (computerScore === winningScore) {
        endGame("computer wins");
    }
}

function printResult(result, playerSelection, computerSelection){
    switch(result){
        case "win":
            resultDisplay.textContent = `You WIN. ${playerSelection} beats ${computerSelection}.`;
            break;
        case "lose":
            resultDisplay.textContent = `You LOST. ${computerSelection} beats ${playerSelection}.`;
            break;
        case "draw":
            resultDisplay.textContent = `You draw. You both picked ${playerSelection}.`;
            break;
    }
}

function updateScore(result){
    if (result === "win"){
        playerScore++;
    } else computerScore++;

    ScoreDisplay.textContent = `Scores on the doors! YOU: ${playerScore} -- COMPUTER: ${computerScore}`;
}

function endGame(finalResult){
    if (finalResult === "player wins"){
        finalResultDisplay.textContent = "You won the game!";
    } else finalResultDisplay.textContent = "You lost the game!";

    setWeaponButtonsTo("disabled"); //prevent continued play after endgame.

    //add a reset button for a new game
    let resetButton = document.createElement("button");
    resetButton.textContent = "Play again?";
    resetButton.addEventListener("click", () => resetGame());
    finalResultDisplay.appendChild(resetButton);
}

function resetGame(){
    playerScore = 0;
    computerScore = 0;
    resultDisplay.textContent = "Pick your weapon. First to 5 wins!";
    ScoreDisplay.textContent = "Score\'s are! You: 0   Computer: 0";
    finalResultDisplay.textContent = "";
    setWeaponButtonsTo("enabled");
}

function setWeaponButtonsTo(status){
    let buttons = [rockButton, paperButton, scissorsButton];
    buttons.forEach((button) => {
        if (status == "disabled"){
            button.setAttribute("disabled", "true");
            button.classList.add("faded"); 
        } else {
            button.removeAttribute("disabled");
            button.classList.remove("faded");
        }
    });
}
