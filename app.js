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
  // cellElements.every((el) => console.log(el.classList.contains(currentClass)));
  console.log(
    cellElements.forEach((el) => {
      if (el && el.classList.contains(currentClass)) {
        if (currentClass === PLAYER_O_CLASS) {
          el.classList.add("winningCellBgO");
        } else {
          el.classList.add("winningCellBgX");
        }
      }
    })
  );

  bgEffect.classList.replace("hide", "show");
  if (currentClass === PLAYER_X_CLASS) {
    winnerSvg.src = "./icons/winnerX.svg";
    winningPlayer.textContent = "PLAYER 1 WINS!";
    console.log(cell);
  } else {
    winnerSvg.src = "./icons/winnerO.svg";
    winningPlayer.textContent = "PLAYER 2 WINS!";
  }
};

const handleClick = (e) => {
  const cell = e.target;
  const currentClass = xTurn ? PLAYER_X_CLASS : PLAYER_O_CLASS;

  placeMark(cell, currentClass);
  if (checkForWin(currentClass)) {
    drawWinner(currentClass, cell);
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
