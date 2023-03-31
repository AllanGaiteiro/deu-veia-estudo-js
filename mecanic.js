let currentPlayer = "X";
let playerXScore = 0;
let playerOScore = 0;
let celCurrent = null;

const cells = document.querySelectorAll(".cell");
const gameBoard = document.getElementById("game-board");
const playerXScoreElement = document.getElementById("player-x-score");
const playerOScoreElement = document.getElementById("player-o-score");

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

function handleCellClick(e) {
  const cell = e.target;
  if (cell.classList.contains("occupied")) return;

  cell.classList.add("occupied", currentPlayer);
  cell.textContent = currentPlayer;

  if (checkWin()) {
    highlightWinner(cell);
    updateScore();
    if (
      (currentPlayer === "X" && playerXScore >= 3) ||
      (currentPlayer === "Y" && playerYScore >= 3)
    ) {
      showWinMessage();
      endGame();
    } else {
      resetGame();
    }
  } else if (checkTie()) {
    showTieMessage();
    resetGame();
  } else {
    switchPlayers();
    if (currentPlayer === "O") {
      makeAIMove();
    }
  }
}

function makeAIMove() {
  let index;
  console.log("makeAIMove", difficulty);
  if (difficulty === "easy") {
    index = getRandomEmptyCellIndex();
  } else if (difficulty === "medium") {
    index = getSmartEmptyCellIndex("X");
    if (index === null) {
      index = getRandomEmptyCellIndex();
    }
  } else if (difficulty === "hard") {
    index = getSmartEmptyCellIndex("O");
    if (index === null) {
      index = getSmartEmptyCellIndex("X");
      if (index === null) {
        index = getRandomEmptyCellIndex();
      }
    }
  }
  cells[index].click();
}

function getRandomEmptyCellIndex() {
  const emptyCells = getEmptyCells();
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}

function getSmartEmptyCellIndex(player) {
  const emptyCells = getEmptyCells();
  for (let i = 0; i < emptyCells.length; i++) {
    const cellIndex = emptyCells[i];
    cells[cellIndex].classList.add(player);
    if (checkWin()) {
      cells[cellIndex].classList.remove(player);
      return cellIndex;
    }
    cells[cellIndex].classList.remove(player);
  }
  return null;
}

function getEmptyCells() {
  return [...cells].reduce((acc, cell, index) => {
    if (!cell.classList.contains("occupied")) {
      acc.push(index);
    }
    return acc;
  }, []);
}

// Função para remover classe winner-cell de todas as células
function clearWinnerCells() {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("winner-cell");
  }
}

// Adiciona classe winner-cell às células da linha vencedora
function highlightWinner(cells) {
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.add("winner-cell");
  }
}

function checkWin() {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // horizontal
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // vertical
    [0, 4, 8],
    [2, 4, 6], // diagonal
  ];

  return winCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentPlayer);
    });
  });
}

function checkTie() {
  return [...cells].every((cell) => {
    return cell.classList.contains("occupied");
  });
}

function updateScore() {
  if (currentPlayer === "X") {
    playerXScore++;
    playerXScoreElement.textContent = playerXScore;
  } else if (currentPlayer === "O") {
    playerOScore++;
    playerOScoreElement.textContent = playerOScore;
  }
}

function switchPlayers() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function showWinMessage() {
  alert(`Player ${currentPlayer} wins!`);
}

function showTieMessage() {
  alert("It's a tie!");
}

function resetGame() {
  // redefinir o tabuleiro
  cells.forEach((cell) => {
    cell.classList.remove("occupied", "X", "O");
    cell.textContent = "";
  });
  currentPlayer = "X";
}
function endGame() {
  // redefinir o tabuleiro
  resetGame();
  playerOScore = 0;
  playerXScoreElement.textContent = playerXScore;
  playerXScore = 0;
  playerOScoreElement.textContent = playerOScore;
}
