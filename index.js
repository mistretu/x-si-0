const cells = document.querySelectorAll('.cell');
const status = document.querySelector('#status');
const resetButton = document.querySelector('#reset');
let currentPlayer = 'X';
let gameIsOver = false;

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // linii
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // coloane
  [0, 4, 8], [2, 4, 6] // diagonale
];

function handleCellClick(event) {
  if (gameIsOver) {
    return;
  }
  
  const cell = event.target;
  if (cell.textContent !== '') {
    return;
  }
  
  cell.textContent = currentPlayer;
  if (checkForWin()) {
    status.textContent = `Castigator: ${currentPlayer}!`;
    gameIsOver = true;
    return;
  }
  
  if (checkForDraw()) {
    status.textContent = 'Remiza!';
    gameIsOver = true;
    return;
  }
  
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Jucatorul curent: ${currentPlayer}`;
}

function checkForWin() {
  return winConditions.some(condition => {
    return condition.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

function checkForDraw() {
  return [...cells].every(cell => {
    return cell.textContent !== '';
  });
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  currentPlayer = 'X';
  gameIsOver = false;
  status.textContent = `Jucatorul curent: ${currentPlayer}`;
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

status.textContent = `Jucatorul curent: ${currentPlayer}`;
