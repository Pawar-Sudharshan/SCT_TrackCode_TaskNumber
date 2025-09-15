// Selecting board container and status text
const board = document.getElementById("board");
const statusText = document.getElementById("status");

// Setting initial variables
let currentPlayer = "X"; // X always starts
let gameActive = true;   // Keeps track if game is running
let gameState = ["", "", "", "", "", "", "", "", ""]; // Stores X/O in each cell

// Winning conditions (combinations of 3 indices)
const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],  // Rows
  [0,3,6], [1,4,7], [2,5,8],  // Columns
  [0,4,8], [2,4,6]            // Diagonals
];

// Function to create the board
function createBoard() {
  board.innerHTML = ""; // Clear old board
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's turn"; // Reset message

  // Create 9 cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i; // Assign each cell a number
    // Add click event to handle player moves
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

// Function that runs when a cell is clicked
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  // Prevent overwriting or playing after game ends
  if (gameState[index] !== "" || !gameActive) return;

  // Place current player's symbol
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Check conditions
  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!"; // No empty cells
    gameActive = false;
  } else {
    // Switch turns
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Function to check winner
function checkWinner() {
  return winningConditions.some(condition => {
    return condition.every(index => gameState[index] === currentPlayer);
  });
}

// Function to reset the game
function resetGame() {
  createBoard();
}

// Initialize the board when game starts
createBoard();
