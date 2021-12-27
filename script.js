const NUM_CELLS = 9;

const playerFactory = function(sign) {
  const _sign = sign;

  const getSign = function() {
    return _sign;
  }

  return { 
    getSign,
  };
};

const gameBoard = (function() {
  const _gameBoard = [];
  let _round = 1;

  const _setDisplay = function(cell) {
    // do not allow players to play the taken spots
    if (cell.textContent !== '') return;

    cell.textContent = gameController.getCurrPlayerSign();
    _round++;
  }

  const getRound = function() {
    return _round;
  }

  const makeBoard = function() {
    for (let i=0; i<NUM_CELLS; i++) {
      _gameBoard[i] = document.getElementById(`cell-${i}`);
    }
  }

  const getBoard = function() {
    return _gameBoard;
  }

  const setField = function() {
    _gameBoard.forEach(cell => {
      cell.addEventListener('click', () => {
        _setDisplay(cell);
        if (gameController.checkWinCondition()) {
          alert(`Player ${gameController.getPrevPlayerSign()} won. Please restart the game.`);
        }
      });
    });
  }

  const resetBoard = function() {
    _gameBoard.forEach(cell => {
      cell.textContent = '';
    });
  }


  return {
    getRound,
    makeBoard,
    getBoard,
    setField,
    resetBoard,
  };
})();

const gameController = (function() {
  const _playerOne = playerFactory('x');
  const _playerTwo = playerFactory('o');
  const _resetBtn = document.getElementById('reset-btn');

  // restart game
  _resetBtn.addEventListener('click', gameBoard.resetBoard);

  const playGame = function() {
    gameBoard.makeBoard();
    gameBoard.setField();
  }

  const checkWinCondition = function() {
    const board = [];

    (gameBoard.getBoard()).forEach(cell => {
      board.push(cell.textContent);
    });
    
    if (
        // horizontal match
        board[0] === board[1] && board[0] === board[2] && board[0] !== '' ||
        board[3] === board[4] && board[3] === board[5] && board[3] !== '' ||
        board[6] === board[7] && board[6] === board[8] && board[6] !== '' ||
        // diagonal match
        board[0] === board[4] && board[0] === board[8] && board[0] !== '' ||
        board[2] === board[4] && board[2] === board[6] && board[2] !== '' ||
        // vertical match
        board[0] === board[3] && board[0] === board[6] && board[0] !== '' ||
        board[1] === board[4] && board[1] === board[7] && board[1] !== '' ||
        board[2] === board[5] && board[2] === board[8] && board[2] !== ''
    ) {
      return true;
    } 
    return false;
  }

  const getCurrPlayerSign = function() {
    return gameBoard.getRound() % 2 === 1 ? _playerOne.getSign() : _playerTwo.getSign();
  }

  const getPrevPlayerSign = function() {
    return gameBoard.getRound() % 2 === 1 ? _playerTwo.getSign() : _playerOne.getSign();
  }

  return {
    playGame,
    checkWinCondition,
    getCurrPlayerSign,
    getPrevPlayerSign,
  };
})();

gameController.playGame();
