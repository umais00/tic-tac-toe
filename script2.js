//function for crating random number 0-9
function rndm() {
  return Math.floor(Math.random() * 9);
}

// Select squares and turn element
const squares = document.querySelectorAll(".square");
const turn = document.getElementById("turn");
const fsound = document.getElementById("myAudio");
let currentPlayer = "X";
let firstPlayer = "X";
let secondPlayer = "O";
let changeTurn = document.getElementById("chngTurn");
let checkForWin;

// Event listener for clicks and touchstart
squares.forEach((square) => {
  square.addEventListener("click", handleMove);
  square.addEventListener("touchstart", handleMove);
});

function handleMove(event) {
  const square = event.target;
  if (!square.textContent) {
    square.textContent = currentPlayer;
    square.style.color = currentPlayer === "X" ? "#0c6291" : "#ff9f1c";
    fsound.play();
    winningLogic();
    if (!checkForWin) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      bot();
    }

    winningLogic();
  }
}

function bot() {
  let maxAttempts = 9; // Maximum attempts to find a vacant square
  while (maxAttempts > 0) {
    let bmove = rndm();
    let csquare = squares[bmove];
    if (csquare && !csquare.textContent) {
      // Check if square exists and is empty
      csquare.style.color = currentPlayer === "X" ? "#0c6291" : "#ff9f1c";
      csquare.textContent = currentPlayer;
      winningLogic();

      currentPlayer = currentPlayer === "X" ? "O" : "X";

      break;
    }
    maxAttempts--;
  }
}

// Winning logic function
function winningLogic() {
  // Winning combinations

  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  // Check each winning combination
  for (let combination of winCombinations) {
    const [a, b, c] = combination;
    if (
      squares[a].textContent &&
      squares[a].textContent === squares[b].textContent &&
      squares[a].textContent === squares[c].textContent
    ) {
      const winner = currentPlayer;
      document.getElementById("winner").textContent = `${winner} WON!!`;
      setTimeout(() => {
        document.getElementById("winner").textContent = "";
      }, 5000);
      clear();
      checkForWin = true;
      return;
    } else {
      checkForWin = false;
    }
  }

  checkDraws();
}

// Check for a draw
function checkDraws() {
  if ([...squares].every((square) => square.textContent)) {
    clear();
    alert("DRAW :)");
  }
}

// Clear the board
function clear() {
  squares.forEach((square) => {
    square.textContent = "";
  });
  currentPlayer = "X";
}

// Event listener for changing modes
document.getElementById("button").addEventListener("click", () => {
  const body = document.body;
  if (body.style.backgroundColor !== "rgb(236, 74, 137)") {
    body.style.backgroundColor = "rgb(236, 74, 137)";
  } else {
    body.style.backgroundColor = "rgb(49, 54, 56)";
  }
});

// Event listener for reset button
document.getElementById("reset").addEventListener("click", clear);
