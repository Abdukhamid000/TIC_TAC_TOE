const sideBtns = document.querySelectorAll("#side-btn");
const svgPaths = document.querySelectorAll("#svgPath");
const playerModeBtn = document.querySelector("[data-playerModeBtn]");
const newGameMenu = document.querySelector("[data-newGameMenu]");
const gameBoard = document.querySelector("[data-gameBoard]");
const cellElements = document.querySelectorAll("[data-cell]");
const squares = document.querySelector(".squares");

// --------------------------------   X   CIRCLE CLASSES   ------------------------------------------ //

const PLAYER_X_CLASS = "x";
const PLAYER_O_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

sideBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sideBtns.forEach((btn) => {
      btn.classList.remove("bg");
    });

    if (e.target.tagName === "BUTTON") e.target.classList.add("bg");
  });
});

playerModeBtn.addEventListener("click", () => {
  newGameMenu.classList.add("hide");
  gameBoard.classList.add("show");
});

// ---------------------------   GAME FUNCTIONALITY   ----------------------------------------- //
let xTurn = true;

const placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass);
};

const changeTurns = () => {
  xTurn = !xTurn;
};

const setHoverClass = () => {
  if (xTurn) {
    squares.classList.remove(PLAYER_O_CLASS);
    squares.classList.add(PLAYER_X_CLASS);
  } else {
    squares.classList.remove(PLAYER_X_CLASS);
    squares.classList.add(PLAYER_O_CLASS);
  }
};
setHoverClass();

const checkForWin = (currentClass) => {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
};

const handleClick = (e) => {
  const cell = e.target;
  const currentClass = xTurn ? PLAYER_X_CLASS : PLAYER_O_CLASS;

  placeMark(cell, currentClass);
  if (checkForWin(currentClass)) console.log("winner" + currentClass);

  changeTurns();
  setHoverClass();
};

cellElements.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});
