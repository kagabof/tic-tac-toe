import express from 'express';
import cors from 'cors';
import { validateInputMiddleware } from './helpers/validate';
import { makeMoves } from './helpers/helperFunctions';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', validateInputMiddleware, (req, res) => {
  const incomingBoard = req?.query?.board;
  const { boardArray } = req?.midOutput || {};
  const dd = boardArray.map((el, index) => {
    if (!(el === 'x' || el === 'o')) {
      return index;
    }
    return el;
  });

  const move = makeMoves(dd, 'o');

  if (move) {
    if (move?.score === -10 && move.index === null) {
      return res.json(`${incomingBoard}`);
    }
  }
  boardArray[move?.index] = 'o';
  return res.json(`${boardArray?.join('')}`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
