const choices = ["Rock", "Paper", "Scissors"];

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

const WIN = "WIN";
const LOSE = "LOSE";
const DRAW = "DRAW";

const DRAW_MSG = "It's a draw!";

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

function game() {
  let computerScore = 0;
  let userScore = 0;
  for (let i = 0; i < 5; i++) {
    let gameStatus = playRound(
      prompt("Choose Rock, Paper, Scissors"),
      getComputerChoice()
    );
    console.log(gameStatus.msg);
    if (gameStatus.gameResult == WIN) {
      userScore++;
    }
    if (gameStatus.gameResult == LOSE) {
      computerScore++;
    }
  }
  console.log(`Your Score: ${userScore}`);
  console.log(`Computer Score: ${computerScore}`);
  console.log(userScore > computerScore ? "You win!" : "you Lose (LOSER!!!)");
}

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
