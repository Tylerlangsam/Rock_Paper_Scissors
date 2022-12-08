const choices = ["Rock", "Paper", "Scissors"];

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

const WIN = "WIN";
const LOSE = "LOSE";
const DRAW = "DRAW";


const BDY = document.querySelector("body");
const allDivs = BDY.querySelectorAll("div");
const newDiv = document.createElement("div");

const rockBtn = document.getElementById("Rock");
const paperBtn = document.getElementById("Paper");
const scissorsBtn = document.getElementById("Scissors");
const resultsDiv = document.getElementById("Results");
const scoreDiv = document.getElementById("Score");
const playerScoreDiv = document.getElementById("PlayerScore");
const computerScoreDiv = document.getElementById("ComputerScore");

const DRAW_MSG = "It's a draw!";

let userScore = 0;
let computerScore = 0;

function getComputerChoice() {
  let randChoice = Math.floor(Math.random() * choices.length);
  return choices[randChoice];
}

function playRound(playerSelection, computerSelection) {
  let playerLc = playerSelection.toLowerCase();
  let computerLc = computerSelection.toLowerCase();

  if (playerLc == computerLc) {
    return { gameResult: DRAW, msg: DRAW_MSG };
  }

  switch (computerLc) {
    case ROCK: {
      return playerLc == PAPER
        ? { gameResult: WIN, msg: "You win! Paper beats Rock" }
        : { gameResult: LOSE, msg: "You lose! Rock beats Scissors" };
    }

    case PAPER: {
      return playerLc == SCISSORS
        ? { gameResult: WIN, msg: "You win! Scissors beats Paper" }
        : { gameResult: LOSE, msg: "You lose! Paper beats Rock" };
    }

    case SCISSORS: {
      return playerLc == ROCK
        ? { gameResult: WIN, msg: "You win! Rock beats Scissors" }
        : { gameResult: LOSE, msg: "You lose! Scissors beats Paper" };
    }
  }
}

function processResults(roundResults) {
  resultsDiv.textContent = roundResults.msg;
  if (roundResults.gameResult == WIN) {
    userScore++;
  }
  if (roundResults.gameResult == LOSE) {
    computerScore++;
  }
  playerScoreDiv.textContent = userScore;
  computerScoreDiv.textContent = computerScore;

  if (userScore == 5) {
    scoreDiv.textContent = "User Wins!";
  }
  if (computerScore == 5) {
    scoreDiv.textContent = "Computer Wins!";
  }

  if (computerScore == 5 || userScore == 5) {
    setTimeout(function () {
      window.location.reload(1);
    }, 5000);
    
    if (userScore == 5) {
      BDY.appendChild(newDiv).className = "firework";
 

      }
    }
  }


rockBtn.addEventListener("click", () => {
  let roundResults = playRound(ROCK, getComputerChoice());
  processResults(roundResults);
});

paperBtn.addEventListener("click", () => {
  let roundResults = playRound(PAPER, getComputerChoice());
  processResults(roundResults);
});

scissorsBtn.addEventListener("click", () => {
  let roundResults = playRound(SCISSORS, getComputerChoice());
  processResults(roundResults);
});

//============================================
//========== Tests ===========================
//============================================

const rightAnswers = [
  { ps: "Rock", cs: "Rock", result: { gameResult: DRAW, msg: DRAW_MSG } },
  {
    ps: "Rock",
    cs: "Paper",
    result: { gameResult: LOSE, msg: "You lose! Paper beats Rock" },
  },
  {
    ps: "Rock",
    cs: "Scissors",
    result: { gameResult: WIN, msg: "You win! Rock beats Scissors" },
  },
  {
    ps: "Paper",
    cs: "Rock",
    result: { gameResult: WIN, msg: "You win! Paper beats Rock" },
  },
  {
    ps: "Paper",
    cs: "Paper",
    result: { gameResult: DRAW, msg: DRAW_MSG },
  },
  {
    ps: "Paper",
    cs: "Scissors",
    result: { gameResult: LOSE, msg: "You lose! Scissors beats Paper" },
  },
  {
    ps: "Scissors",
    cs: "Rock",
    result: { gameResult: LOSE, msg: "You lose! Rock beats Scissors" },
  },
  {
    ps: "Scissors",
    cs: "Paper",
    result: { gameResult: WIN, msg: "You win! Scissors beats Paper" },
  },
  {
    ps: "Scissors",
    cs: "Scissors",
    result: { gameResult: DRAW, msg: DRAW_MSG },
  },
];

for (expectedAnswer of rightAnswers) {
  let answer = JSON.stringify(playRound(expectedAnswer.ps, expectedAnswer.cs));
  let expected = JSON.stringify(expectedAnswer.result);
  if (answer != expected) {
    console.log(
      `Oops, playRound(${expectedAnswer.ps},${expectedAnswer.cs}) was: `
    );
    console.log(`\t"${answer}" `);
    console.log("but we expected: ");
    console.log(`\t${expected}`);
  }
}
