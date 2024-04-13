const { convertToBoard, getPieceColor } = require("../gameLogic/helpers");
const { pieceWeights, pst_w } = require("./pieceValues");

const calculatePositionValue = (board, allyColor) => {
  let totalValue = 0;
  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if(getPieceColor(col) === allyColor && col !== '0'){
        totalValue += pieceWeights[col.toLowerCase()]
        if(allyColor === 'white'){
          totalValue += pst_w[col.toLowerCase()][rowIndex][colIndex]
        }
      }
    })
  })
  return totalValue
}

const initialPostion = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const secondPosition = "rnbqkbnr/pppppppp/8/8/3P4/8/PPPP1PPP/RNBQKBNR b KQkq - 1 1";
const board = convertToBoard(initialPostion);
console.log(calculatePositionValue(board.pieces,board.turn === 'w'? 'white' : 'black'));