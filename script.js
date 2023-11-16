// JavaScript code for the Tic Tac Toe game
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let scores = { 'X': 0, 'O': 0 };

const cells = document.getElementById('board');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');

// Create the Tic Tac Toe board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    cells.appendChild(cell);
}

// Reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    updateBoard();
    document.getElementById('board').classList.remove('disabled'); // Remove disabled class
}

// Exit the game
function exitGame() {
    alert('Thanks for playing!');
    // You can add additional logic here if needed
}

// Handle cell clicks
function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (board[index] === '' && !checkWinner()) {
        board[index] = currentPlayer;
        if (checkWinner()) {
            scores[currentPlayer]++;
            alert(`Player ${currentPlayer} wins!`);
            resetGame();
        } else if (board.every(cell => cell !== '')) {
            alert('It\'s a draw!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateBoard();
        }
    }
}

// Check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById('board').classList.add('disabled'); // Add disabled class
            return true;
        }
    }

    return false;
}

// Update the game board
function updateBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = cells.children[i];
        cell.textContent = board[i];
    }

    scoreXElement.textContent = scores['X'];
    scoreOElement.textContent = scores['O'];
}
