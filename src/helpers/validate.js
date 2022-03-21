/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
export const validateInputMiddleware = (req, res, next) => {
  const { board } = req.query;
  if (!board) {
    return res.status(400).json({
      error: 'board required ',
    });
  }
  if (typeof board !== 'string') {
    return res.status(400).json({
      error: 'board should be a string',
    });
  }
  if (board?.length !== 9) {
    return res.status(400).json({
      error: 'invalid board input',
    });
  }
  const boardArray = board.split('');
  let oCount = 0;
  let xCount = 0;
  for (let i = 0; i < boardArray.length; i++) {
    if (boardArray[i] !== ' ' && boardArray[i] !== 'x' && boardArray[i] !== 'o') {
      return res.status(400).json({
        error: 'invalid board input',
      });
    }
    if (boardArray[i] === 'x') {
      xCount += 1;
    }
    if (boardArray[i] === 'o') {
      oCount += 1;
    }
  }
  if (Math.abs(xCount - oCount) > 1) {
    return res.status(400).json({
      error: 'invalid board input play',
    });
  }

  if (oCount > xCount) {
    return res.status(400).json({
      error: "It's turn to play",
    });
  }
  req.midOutput = {
    oCount, xCount, boardArray, serverFirst: oCount === xCount,
  };

  return next();
};
