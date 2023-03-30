const sideBtns = document.querySelectorAll("#side-btn");
const svgPaths = document.querySelectorAll("#svgPath");
const playerModeBtn = document.querySelector("[data-playerModeBtn]");
const newGameMenu = document.querySelector("[data-newGameMenu]");
const gameBoard = document.querySelector("[data-gameBoard]");
const cellElements = document.querySelectorAll("[data-cell]");
const squares = document.querySelector(".squares");
const turnSvg = document.querySelector("#turnSvg");
const winnerSvg = document.querySelector("#winnerSvg");
const bgEffect = document.querySelector("[data-effect]");
const winningPlayer = document.querySelector("[data-winning-player]");
const quitBtn = document.querySelector("[data-quit]");
const nextRoundBtn = document.querySelector("[data-next-round]");
const xScore = document.querySelector("[data-xScore]");
const tieScore = document.querySelector("[data-tieScore]");
const oScore = document.querySelector("[data-oScore]");
const drawText = document.querySelector("[data-draw-text]");
const refreshBtn = document.querySelector("[data-refresh]");
const drawEffect = document.querySelector("[data-draw-effect]");
const cancelBtn = document.querySelector("[data-cancel]");
const restartBtn = document.querySelector("[data-restart]");
const dataWinningText = document.querySelector("[data-winning-text]");
const btnSvgPaths = document.querySelectorAll("[data-path]");

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

function addBgToBtn() {
  sideBtns[1].classList.remove("bg");
  sideBtns[0].classList.add("bg");
  btnSvgPaths[0].style.fill = "#1a2a33";
  btnSvgPaths[1].style.fill = "#a8bfc9";
}

function addBgToBtn2() {
  btnSvgPaths[0].style.fill = "#a8bfc9";
  btnSvgPaths[1].style.fill = "#1a2a33";
  sideBtns[0].classList.remove("bg");
  sideBtns[1].classList.add("bg");
}

playerModeBtn.addEventListener("click", () => {
  newGameMenu.classList.add("hide");
  gameBoard.classList.add("show");
});

// ---------------------------   GAME FUNCTIONALITY   ----------------------------------------- //
let xTurn = true;
const stack = [];

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
    turnSvg.src = "./icons/x (2).svg";
  } else {
    squares.classList.remove(PLAYER_X_CLASS);
    squares.classList.add(PLAYER_O_CLASS);
    turnSvg.src = "./icons/o.svg";
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

const drawWinner = (currentClass, cell) => {
  cellElements.forEach((el) => {
    if (el && el.classList.contains(currentClass)) {
      if (currentClass === PLAYER_O_CLASS) {
        el.classList.add("winningCellBgO");
      } else {
        el.classList.add("winningCellBgX");
      }
    }
  });

  bgEffect.classList.replace("hide", "show");
  if (currentClass === PLAYER_X_CLASS) {
    winnerSvg.src = "./icons/winnerX.svg";
    drawText.textContent = "TAKES THE ROUND";
    winningPlayer.textContent = "PLAYER 1 WINS!";
  } else {
    winnerSvg.src = "./icons/winnerO.svg";
    drawText.textContent = "TAKES THE ROUND";
    winningPlayer.textContent = "PLAYER 2 WINS!";
  }
};

const incrementScore = (currentClass) => {
  if (currentClass === PLAYER_X_CLASS) {
    xScore.textContent = +xScore.textContent + 1;
  } else {
    oScore.textContent = +oScore.textContent + 1;
  }
};

const isFulledBoard = (currentClass) => {
  const cells = Array.from(cellElements);
  if (!checkForWin(currentClass)) {
    console.log("NO WINNER");
    return cells.every((el) => el.classList.length === 2);
  }
};

const handleClick = (e) => {
  const cell = e.target;
  const currentClass = xTurn ? PLAYER_X_CLASS : PLAYER_O_CLASS;

  placeMark(cell, currentClass);
  if (checkForWin(currentClass)) {
    drawWinner(currentClass, cell);
    incrementScore(currentClass);
  }

  if (isFulledBoard(currentClass)) {
    winnerSvg.src = "";
    bgEffect.classList.replace("hide", "show");
    drawText.textContent = "ROUND TIED";
    winningPlayer.textContent = "";
    tieScore.textContent = +tieScore.textContent + 1;
  }

  changeTurns();
  setHoverClass();
};

cellElements.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

quitBtn.addEventListener("click", (e) => {
  window.location.reload();
});

const clearBoard = () => {
  cellElements.forEach((el) => {
    el.classList.value = el.classList.value.slice(0, 4);
  });

  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });

  bgEffect.classList.replace("show", "hide");
  xTurn = true;
  squares.classList.replace(PLAYER_O_CLASS, PLAYER_X_CLASS);
};

nextRoundBtn.addEventListener("click", (e) => {
  clearBoard();
  setHoverClass();
});

refreshBtn.addEventListener("click", (e) => {
  drawEffect.classList.replace("hide", "show");
});

cancelBtn.addEventListener("click", (e) => {
  drawEffect.classList.replace("show", "hide");
});

restartBtn.addEventListener("click", () => {
  drawEffect.classList.replace("show", "hide");
  clearBoard();
  xTurn = true;
  setHoverClass();
  xScore.textContent = 0;
  oScore.textContent = 0;
  tieScore.textContent = 0;
});
