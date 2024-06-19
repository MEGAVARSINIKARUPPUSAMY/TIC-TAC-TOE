
const buttons = document.querySelectorAll('.button-option');
const restartButton = document.getElementById('restart');
const popup = document.getElementById('popup');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameActive = true;

function handleButtonClick() {
    if (gameActive && !this.textContent) {
        this.textContent = currentPlayer;
        if (checkWin()) {
            gameActive = false; 
            message.textContent = ` congratulations ${currentPlayer} wins! 🎉`;
            togglePopup();
        } else if (checkDraw()) {
            gameActive = false;
            message.textContent = 'oops! It\'s a draw! Try again 😕';
            togglePopup();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
    
}

function handleRestartClick() {
    buttons.forEach(button => {
        button.textContent = '';
    });
    gameActive = true;
    currentPlayer = 'X';
    popup.classList.add('hide');
}

function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    return winningCombos.some(combo => {
        return buttons[combo[0]].textContent &&
            buttons[combo[0]].textContent === buttons[combo[1]].textContent &&
            buttons[combo[1]].textContent === buttons[combo[2]].textContent;
    });
}

function checkDraw() {
    return Array.from(buttons).every(button => button.textContent);
}

function togglePopup() {
    popup.classList.toggle('hide');
}

// Event Listeners
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

