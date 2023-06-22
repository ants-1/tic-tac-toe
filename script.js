const GameBoard = () => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const setField = (index, value) => {
    board[index] = value;
  };

  const getField = (index) => board[index];

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = '';
    }
  };

  return {
    board,
    setField,
    getField,
    resetBoard,
  };
};

const Player = (sign) => {
  const getSign = sign;

  return { getSign };
};

const gameController = (getField, board) => {
  const checkWin = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let isTie = true;

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];

      if (board[a] === 'X' && board[b] === 'X' && board[c] === 'X') {
        return 'Player X wins';
      }
      if (board[a] === 'O' && board[b] === 'O' && board[c] === 'O') {
        return 'Player O wins';
      }

      if (board[a] === '' || board[b] === '' || board[c] === '') {
        isTie = false;
      }
    }

    if (isTie && board.every((cell) => cell !== '')) {
      return 'Tie';
    }

    return '';
  };

  return { checkWin };
};

const displayController = () => {
  const {
    setField, getField, resetBoard, board,
  } = GameBoard();
  const { checkWin } = gameController(getField, board);
  const cellElements = document.querySelectorAll('.cell');
  const resetBtn = document.querySelectorAll('.reset');
  const overlay = document.getElementById('overlay');
  const gameMessage = document.getElementById('game-msg');
  const playerX = Player('X');
  const playerO = Player('O');
  let isPlayerTurn = true;

  const activePlayer = (sign) => {
    const playerXCard = document.querySelector('.player-one');
    const playerOCard = document.querySelector('.player-two');

    if (sign === true) {
      playerXCard.classList.add('active');
      playerOCard.classList.remove('active');
    } else {
      playerOCard.classList.add('active');
      playerXCard.classList.remove('active');
    }
  };

  const displayWinner = (winnerSign) => {
    gameMessage.textContent = `Player ${winnerSign} Wins!`;
    overlay.style.display = 'block';
  };

  const displayTie = () => {
    gameMessage.textContent = "It's a Tie!";
    overlay.style.display = 'block';
  };

  activePlayer(isPlayerTurn);

  cellElements.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      if (cell.textContent === '') {
        cell.textContent = isPlayerTurn ? playerX.getSign : playerO.getSign;
        setField(index, cell.textContent);
        isPlayerTurn = !isPlayerTurn;
        activePlayer(isPlayerTurn);

        const isGameWon = checkWin();

        if (isGameWon === 'Player X wins' || isGameWon === 'Player O wins') {
          displayWinner(isPlayerTurn ? playerO.getSign : playerX.getSign);
        } else if (isGameWon === 'Tie') {
          displayTie();
        }
      }
    });
  });

  resetBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      resetBoard();
      cellElements.forEach((cell) => {
        cell.textContent = '';
      });
      activePlayer(true);
      isPlayerTurn = true;
      overlay.style.display = 'none';
    });
  });
};

displayController();
