let cells = document.querySelectorAll(".cell");
let restartBtn = document.querySelector("#restart-btn");
let startNewBtn = document.querySelector("#start-new-btn");
let notificationContainer = document.querySelector(".notification-container");
let message = document.querySelector("#message");

let turnO = true; //playerX, playerO
let moveCount = 0; //To Track Draw

const winningPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const restartGame = () => {
  turnO = true;
  moveCount = 0;
  enableCells();
  notificationContainer.classList.add("hidden");
};

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (turnO) {
      //playerO
      cell.innerText = "O";
      turnO = false;
    } else {
      //playerX
      cell.innerText = "X";
      turnO = true;
    }
    cell.disabled = true;
    moveCount++;

    let winnerDetected = detectWinner();

    if (moveCount === 9 && !winnerDetected) {
      drawGame();
    }
  });
});

const drawGame = () => {
  message.innerText = `Game was a Draw.`;
  notificationContainer.classList.remove("hidden");
  disableCells();
};

const disableCells = () => {
  for (let cell of cells) {
    cell.disabled = true;
  }
};

const enableCells = () => {
  for (let cell of cells) {
    cell.disabled = false;
    cell.innerText = "";
  }
};

const displayWinner = (winner) => {
  message.innerText = `Congratulations, Winner is ${winner}`;
  notificationContainer.classList.remove("hidden");
  disableCells();
};

const detectWinner = () => {
  for (let pattern of winningPatterns) {
    let pos1Val = cells[pattern[0]].innerText;
    let pos2Val = cells[pattern[1]].innerText;
    let pos3Val = cells[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        displayWinner(pos1Val);
        return true;
      }
    }
  }
};

startNewBtn.addEventListener("click", restartGame);
restartBtn.addEventListener("click", restartGame);
