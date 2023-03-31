const easyButton = document.getElementById("easy-button");
const mediumButton = document.getElementById("medium-button");
const hardButton = document.getElementById("hard-button");
const difficultyDisplay = document.getElementById("difficulty-display");
let difficulty = 'easy';

easyButton.addEventListener("click", () => {
  difficulty = "easy";
  difficultyDisplay.textContent = `Dificuldade selecionada: ${difficulty}`;
  resetGame();
});

mediumButton.addEventListener("click", () => {
  difficulty = "medium";
  difficultyDisplay.textContent = `Dificuldade selecionada: ${difficulty}`;
  resetGame();
});

hardButton.addEventListener("click", () => {
  difficulty = "hard";
  difficultyDisplay.textContent = `Dificuldade selecionada: ${difficulty}`;
  resetGame();
});
