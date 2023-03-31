const easyButton = document.getElementById("easy-btn");
const mediumButton = document.getElementById("medium-btn");
const hardButton = document.getElementById("hard-btn");
let difficulty = "easy";

easyButton.addEventListener("click", () => {
  difficulty = "easy";
  changeBtn(difficulty);
  resetGame();
});

mediumButton.addEventListener("click", () => {
  difficulty = "medium";
  changeBtn(difficulty);
  resetGame();
});

hardButton.addEventListener("click", () => {
  difficulty = "hard";
  changeBtn(difficulty);
  resetGame();
});

function changeBtn(difficulty) {
  if (difficulty === "easy") {
    easyButton.classList.add("active");
  } else {
    easyButton.classList.remove("active");
  }

  if (difficulty === "medium") {
    mediumButton.classList.add("active");
  } else {
    mediumButton.classList.remove("active");
  }

  if (difficulty === "hard") {
    hardButton.classList.add("active");
  } else {
    hardButton.classList.remove("active");
  }
}
