Tic-Tac-Toe - Classic Game  
[](https://github.com/Pawar-Sudharshan/SCT_TrackCode_TaskNumber/tree/main/SCT_WD_3#tic-tac-toe---classic-game)  
[GitHub Link](https://github.com/Pawar-Sudharshan/SCT_TrackCode_TaskNumber/tree/main/SCT_WD_3#tic-tac-toe---classic-game)  
[](https://github.com/Pawar-Sudharshan/SCT_TrackCode_TaskNumber/blob/main/SCT_WD_3/assets/image.jpg)

## Overview  
[](https://github.com/Pawar-Sudharshan/SCT_TrackCode_TaskNumber/tree/main/SCT_WD_3#overview)  
The Tic-Tac-Toe game is a simple, interactive web application built with HTML, CSS, and JavaScript. It features a 3x3 grid where two players alternate turns placing X and O until one wins or the game ends in a draw. The UI is minimalistic and responsive with clear status updates and a reset button for replayability.

## Features  
[](https://github.com/Pawar-Sudharshan/SCT_TrackCode_TaskNumber/tree/main/SCT_WD_3#features)  
✅ Responsive 3x3 grid layout using CSS Grid  
✅ Two-player turn-based gameplay (Player X and Player O)  
✅ Clear visual feedback on each player’s move  
✅ Detection of win conditions across rows, columns, and diagonals  
✅ Draw detection when all cells are filled with no winner  
✅ Real-time status updates indicating turns, wins, or draws  
✅ Restart button to reset and replay the game

## How to Use  
[](https://github.com/Pawar-Sudharshan/SCT_TrackCode_TaskNumber/tree/main/SCT_WD_3#how-to-use)  
- Open the `index.html` file in any modern web browser.  
- Click on any empty cell to mark X or O depending on the current player's turn.  
- The status message updates automatically to indicate the next player or the game outcome.  
- Click the "Restart Game" button to reset the board and start a new game.

## Project Structure  
[](https://github.com/Pawar-Sudharshan/SCT_TrackCode_TaskNumber/tree/main/SCT_WD_3#project-structure)  
TicTacToe/  
│  
├── index.html       # Main HTML file for layout and structure  
├── style.css        # Styles for visual layout and responsiveness  
├── script.js        # JavaScript for game logic and interactivity  
├── assets/          # Folder containing screenshots and media files  
│   └── screenshot.jpg  # Screenshot of the game UI

## Code Overview  
[](https://github.com/Pawar-Sudharshan/SCT_TrackCode_TaskNumber/tree/main/SCT_WD_3#code-overview)  
- The game logic is event-driven, listening for clicks on cells.  
- `gameState` array keeps track of the board's state with "X", "O", or "" for empty cells.  
- The `winningConditions` array stores all the possible winning index combinations.  
- Functions:  
  - `createBoard()` initializes and renders the board.  
  - `handleCellClick()` processes user clicks, updates state and UI, and checks for game end.  
  - `checkWinner()` evaluates whether the current player has won.  
  - `resetGame()` resets the game to start fresh.

## Browser Compatibility  
[](https://github.com/Pawar-Sudharshan/SCT_TrackCode_TaskNumber/tree/main/SCT_WD_3#browser-compatibility)  
Compatible with all major modern browsers including Chrome, Firefox, Safari, and Edge. The layout and interaction are responsive and accessible on desktop and mobile devices.

## Author  
[](https://github.com/Pawar-Sudharshan/SCT_TrackCode_TaskNumber/tree/main/SCT_WD_3#author)  
Sudharshan Pawar  
GitHub: [github.com/Pawar-Sudharshan](https://github.com/Pawar-Sudharshan)  
Email: [pawarsudharshan47@gmail.com](mailto:pawarsudharshan47@gmail.com)

## License  
[](https://github.com/Pawar-Sudharshan/SCT_TrackCode_TaskNumber/tree/main/SCT_WD_3#license)  
This project is open source and free to use, modify, and distribute.
