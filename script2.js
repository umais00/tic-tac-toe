//all main declaration
const squares = document.querySelectorAll(".square");
const fsound = document.getElementById("myAudio");
let currentPlayer = "X";
let changeTurn = document.getElementById("chngTurn");
let changeMode = document.getElementById("button");

// Event listener for clicks and touchstart
squares.forEach((square) => {
  square.addEventListener("click", handleMove);
  square.addEventListener("touchstart", handleMove);
});

// Event listener for changing modes
changeMode.addEventListener("click", changeLight);

// Event listener for reset button
document.getElementById("reset").addEventListener("click", () => {
  clear();
  currentPlayer = "X";
  enableButtons();
});

//button for making bot start first
changeTurn.addEventListener("click", botStartsFirst);

//main functions

//1 Function for creating random number 0-8
function rndm() {
  return Math.floor(Math.random() * 9);
}

//2 fuction for handling each move
function handleMove(event) {
  const square = event.target;
  if (!square.textContent) {
    square.textContent = currentPlayer;
    square.style.color = currentPlayer === "X" ? "#0c6291" : "#ff9f1c";
    fsound.play();
    if (winningLogic()) return;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    declareDraw();
    bot();
    return;
  }
}

//3 function for the bot's turn
function bot() {
  let maxAttempts = 10; // Maximum attempts to find a vacant square
  while (maxAttempts > 0) {
    let bmove = rndm(); // Assuming rndm() generates a random number
    let csquare = squares[bmove];
    if (csquare && !csquare.textContent) {
      // Check if square exists and is empty
      csquare.style.color = currentPlayer === "X" ? "#0c6291" : "#ff9f1c";
      csquare.textContent = currentPlayer; // Check for winning condition after the bot's move

      if (winningLogic()) {
        return; // Exit the function if winning condition is met
      }
      currentPlayer = currentPlayer === "X" ? "O" : "X";

      return; // Exit the bot function after making a move
    }
    maxAttempts--;
  }
}

//function for the winning logic
function winningLogic() {
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

  for (let combination of winCombinations) {
    const [a, b, c] = combination;
    const squareA = squares[a].textContent;
    const squareB = squares[b].textContent;
    const squareC = squares[c].textContent;

    if (squareA && squareA === squareB && squareA === squareC) {
      const winner = squareA;
      document.getElementById("winner").textContent = `${winner} WON!!`;

      setTimeout(() => {
        document.getElementById("winner").textContent = "";
        clear();
      }, 4900);

      disableButtons();

      const winningSquares = [squares[a], squares[b], squares[c]];
      let blinkInterval = setInterval(function () {
        winningSquares.forEach((square) => {
          square.style.backgroundColor = "grey";
          square.style.visibility =
            square.style.visibility === "hidden" ? "visible" : "hidden";
        });
      }, 250);

      setTimeout(() => {
        clearInterval(blinkInterval);
        winningSquares.forEach((square) => {
          square.style.backgroundColor = "transparent";
          square.style.visibility = "visible";
          clear();
        });
      }, 5000);

      return true;
    }
  }

  declareDraw();
}

// Declare draw function
function declareDraw() {
  if ([...squares].every((square) => square.textContent)) {
    disableButtons();

    setTimeout(() => {
      document.getElementById("winner").textContent = `it's a draw!!`;
      clear();
    }, 1500);
    document.getElementById("winner").textContent = ``;
  }
}

// Clear the board
function clear() {
  squares.forEach((square) => {
    square.textContent = "";
    enableButtons();
  });
}

function changeLight() {
  const body = document.body;
  if (body.style.backgroundColor !== "rgb(236, 74, 137)") {
    body.style.backgroundColor = "rgb(236, 74, 137)";
  } else {
    body.style.backgroundColor = "rgb(49, 54, 56)";
  }
}

// Function to disable all buttons
function disableButtons() {
  squares.forEach((square) => {
    square.removeEventListener("click", handleMove);
    square.removeEventListener("touchstart", handleMove);
  });
  changeTurn.removeEventListener("click", botStartsFirst);
  changeMode.removeEventListener("click", changeLight);
}

// Function to enable all buttons
function enableButtons() {
  squares.forEach((square) => {
    square.addEventListener("click", handleMove);
    square.addEventListener("touchstart", handleMove);
  });
  changeTurn.addEventListener("click", botStartsFirst);
  changeMode.addEventListener("click", changeLight);
}

function botStartsFirst() {
  // Check if the board is clear
  let isBoardClear = true;
  for (let square of squares) {
    if (square.textContent !== "") {
      isBoardClear = false;
      break;
    }
  } // If the board is clear, let the bot start first

  if (isBoardClear) {
    currentPlayer = "X";
    bot();
  } else {
    clear();
  }
}
