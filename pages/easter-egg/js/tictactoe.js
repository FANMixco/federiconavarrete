const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameActive = true;
let aiThinking = false; // Flag to indicate whether the AI is currently making a move

document.getElementById('footer').innerHTML += `&nbsp;${new Date().getFullYear()}`;

function restartGame() {
    location.reload();
}

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-cell'));

    if (cell.textContent !== '' || !gameActive || aiThinking || currentPlayer === 'O') return; // Ignore clicks while AI is thinking or if it's not the user's turn

    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        message.classList.add('win-text');
        highlightWinner();
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (isDraw()) {
        message.classList.add('win-text');
        message.textContent = "It's a draw!";
        gameActive = false;
        handleDraw();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `${currentPlayer}'s turn`;
        if (currentPlayer === 'O') {
            aiThinking = true; // Set the flag to indicate AI is thinking
            setTimeout(makeMove, 500); // Delay AI move by 500ms
        }
    }
}

function makeMove() {
    if (currentPlayer !== 'O') return; // Only make move if current player is "O"
    if (Math.random() < 0.75) {
        // With 80% probability, make a random move
        makeOptimalMove();
    } else {
        // With 20% probability, make an optimal move
        makeRandomMove();
    }
    aiThinking = false; // Reset the flag after AI's move
    // Add back event listeners after AI's move is done
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== '') && !checkWin('X') && !checkWin('O');
}

function highlightWinner() {
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (
            cells[a].textContent === cells[b].textContent &&
            cells[b].textContent === cells[c].textContent &&
            cells[a].textContent !== ''
        ) {
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
        }
    });
}

function handleDraw() {
    cells.forEach(cell => {
        cell.classList.add('draw');
    });
    document.querySelector('.board').classList.add('draw-board');
}

function makeRandomMove() {
    const emptyCells = [...cells].filter(cell => cell.textContent === '');
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cell = emptyCells[randomIndex];
    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        highlightWinner();
        message.classList.add('win-text');
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (isDraw()) {
        message.classList.add('win-text');
        message.textContent = "It's a draw!";
        gameActive = false;
        handleDraw();
    } else {
        currentPlayer = 'X'; // Switch back to player X if game is still active
        message.textContent = `${currentPlayer}'s turn`;
    }
}

function makeOptimalMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === '') {
            cells[i].textContent = currentPlayer;
            const score = minimax(cells, 0, false);
            cells[i].textContent = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    cells[move].textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        message.classList.add('win-text');
        highlightWinner();
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (isDraw()) {
        message.classList.add('win-text');
        message.textContent = "It's a draw!";
        gameActive = false;
        handleDraw();
    } else {
        currentPlayer = 'X'; // Switch back to player X after AI's turn
        message.textContent = `${currentPlayer}'s turn`;
    }
    aiThinking = false; // Reset the flag after AI's move
}

function minimax(cells, depth, isMaximizing) {
    const result = checkResult();
    if (result !== null) {
        return result;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent === '') {
                cells[i].textContent = 'O';
                const score = minimax(cells, depth + 1, false);
                cells[i].textContent = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent === '') {
                cells[i].textContent = 'X';
                const score = minimax(cells, depth + 1, true);
                cells[i].textContent = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkResult() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (cells[a].textContent === cells[b].textContent &&
            cells[b].textContent === cells[c].textContent &&
            cells[a].textContent !== '') {
            if (cells[a].textContent === 'O') {
                return 1;
            } else {
                return -1;
            }
        }
    }
    if (isDraw()) {
        return 0;
    }
    return null;
}

function startGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
        cell.addEventListener('click', handleCellClick);
    });
    message.textContent = `${currentPlayer}'s turn`;
    gameActive = true;
}

startGame();