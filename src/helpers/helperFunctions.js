/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
const clientPlayer = 'x';
const serverPlayer = 'o';

/**
 * finding empty spots
 * @param board it is an array
 * @returns an array
 */
const findSpot = (board) => board.filter((s) => s !== 'x' && s !== 'o');

// winning conditions
/**
 * check for the winning conditions
 * @param {*} boardData
 * @param {*} player
 * @returns
 */
const checkWin = (boardData, player) => {
  if (
    (boardData[0] === player && boardData[1] === player && boardData[2] === player)
    || (boardData[3] === player && boardData[4] === player && boardData[5] === player)
    || (boardData[6] === player && boardData[7] === player && boardData[8] === player)
    || (boardData[0] === player && boardData[3] === player && boardData[6] === player)
    || (boardData[1] === player && boardData[4] === player && boardData[7] === player)
    || (boardData[2] === player && boardData[5] === player && boardData[8] === player)
    || (boardData[0] === player && boardData[4] === player && boardData[8] === player)
    || (boardData[2] === player && boardData[4] === player && boardData[6] === player)
  ) {
    return true;
  }
  return false;
};

const getScore = (boardData, emptySpot) => {
  // check for the client win
  if (checkWin(boardData, clientPlayer)) {
    return {
      score: -10,
    };
  }
  // check for the server win
  if (checkWin(boardData, serverPlayer)) {
    return {
      score: 10,
    };
  }
  // check the end
  if (emptySpot.length === 0) {
    return {
      score: 0,
    };
  }
  return null;
};

/**
 * check the best ove to make based on the current board state
 * @param {array} board
 * @param {string['x' | 'o']} player x
 * @returns an object { index: best move index, score: score status }
 */
export const makeMoves = (board, player) => {
  const boardData = board;
  const array = findSpot(boardData);
  const score = getScore(boardData, array);

  if (score) {
    return score;
  }

  const moves = [];
  // make possible moves
  for (let i = 0; i < array.length; i++) {
    const move = {};
    move.index = boardData[array[i]];
    boardData[array[i]] = player;

    if (player === serverPlayer) {
      const playerMoveScore = makeMoves(boardData, clientPlayer);
      move.score = playerMoveScore.score;
    } else {
      const playerMoveScore = makeMoves(boardData, serverPlayer);
      move.score = playerMoveScore.score;
    }
    // and new moves
    boardData[array[i]] = move.index;
    moves.push(move);
  }

  let bestMove;
  // find the best move
  if (player === serverPlayer) {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
};
