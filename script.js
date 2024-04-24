// Select squares and turn element
const squares = document.querySelectorAll(".square");
const turn = document.getElementById("turn");
const fsound = document.getElementById("myAudio");
let currentPlayer = "X";
let firstPlayer;
let secondPlayer;

// Event listener for clicks and touchstart
squares.forEach((square) => {
  square.addEventListener("click", handleMove);
  square.addEventListener("touchstart", handleMove);
});

// Handle move function
function handleMove(event) {
  const square = event.target;
  if (!square.textContent) {
    // Check if player names are provided, otherwise default to "X" and "Y"
    firstPlayer = document.getElementById("f").value || "X";
    secondPlayer = document.getElementById("s").value || "O";

    square.textContent = currentPlayer;
    // Set color for X and O
    square.style.color = currentPlayer === "X" ? "#0c6291" : "#ff9f1c";
    winningLogic();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    fsound.play();
    turn.innerHTML = `&nbsp;${currentPlayer}'s Turn!&nbsp;`;
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
      const winner = currentPlayer === "X" ? firstPlayer : secondPlayer;
      document.getElementById("winner").textContent = `${winner} WON!!`;
      setTimeout(() => {
        document.getElementById("winner").textContent = "";
      }, 5000);
      clear();
      return;
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
  currentPlayer = "O";
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
