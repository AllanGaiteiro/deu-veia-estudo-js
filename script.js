let currentPlayer = "X";
const cells = document.querySelectorAll(".cell");
const gameBoard = document.getElementById("game-board");
const easyButton = document.getElementById("easy-button");
const mediumButton = document.getElementById("medium-button");
const hardButton = document.getElementById("hard-button");
let  difficulty = "easy";

easyButton.addEventListener("click", () => {
  difficulty = "easy";
  console.log(difficulty);
});

mediumButton.addEventListener("click", () => {
  difficulty = "medium";
  console.log(difficulty);
});

hardButton.addEventListener("click", () => {
  difficulty = "hard";
  console.log(difficulty);
});

cells.forEach(cell => cell.addEventListener("click", handleCellClick));

function handleCellClick(e) {
  const cell = e.target;
  if (cell.classList.contains("occupied")) return;

  cell.classList.add("occupied", currentPlayer);
  cell.textContent = currentPlayer;

  if (checkWin()) {
    showWinMessage();
    resetGame();
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
    console.log('makeAIMove',difficulty);
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

function checkWin() {
  const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6] // diagonal
  ];

  return winCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentPlayer);
    });
  });
}

function checkTie() {
  return [...cells].every(cell => {
    return cell.classList.contains("occupied");
  });
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
  cells.forEach(cell => {
    cell.classList.remove("occupied", "X", "O");
    cell.textContent = "";
  });
  currentPlayer = "X";
}