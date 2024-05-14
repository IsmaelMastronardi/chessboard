const { finalizeMove } = require("../gameLogic/completeMove");
const { calculatePosibleMoves } = require("../gameLogic/generateMoves");
const { convertToBoard, getPieceColor } = require("../gameLogic/helpers");
const { pieceWeights, pst_w, pst_b } = require("./pieceValues");

const calculatePositionValue = (board, allyColor) => {
  let totalValue = 0;
  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if(col !== '0'){
        if(getPieceColor(col) === allyColor){
          totalValue += pieceWeights[col.toLowerCase()]
          allyColor === 'white' ? totalValue += pst_w[col.toLowerCase()][rowIndex][colIndex] : totalValue += pst_b[col.toLowerCase()][rowIndex][colIndex]
        }
        else {
          totalValue -= pieceWeights[col.toLowerCase()]
          allyColor === 'white' ? totalValue -= pst_b[col.toLowerCase()][rowIndex][colIndex] : totalValue -= pst_w[col.toLowerCase()][rowIndex][colIndex]
        }
      }
    })
  })
  return totalValue
}

const minimax = (board, depth, maximizingPlayer) => {
  if (depth === 0) {
    return {
      value: calculatePositionValue(board.pieces, board.turn === 'w' ? 'white' : 'black'),
    };
  } else {
    const moves = calculatePosibleMoves(board, board.turn === 'w' ? 'white' : 'black');
    if (moves === 'checkmate') {
      return {
        value: board.turn !== 'w' ? -Infinity : Infinity,
      };
    }
    if (moves === 'stalemate') {
      return {
        value: 0,
      };
    }
    let bestValue = maximizingPlayer ? -Infinity : Infinity;
    let bestMove = null;
    for (const key in moves) {
      for (const move of moves[key]) {
        const newBoard = JSON.parse(JSON.stringify(board));
        finalizeMove(newBoard, key, move);
        const { value } = minimax(newBoard, depth - 1, !maximizingPlayer);
        if ((maximizingPlayer && value > bestValue) || (!maximizingPlayer && value < bestValue)) {
          bestValue = value;
          bestMove = { piece: key, move : move };
        }
      }
    }
    return {
      value: bestValue,
      piece: bestMove.piece,
      move: bestMove.move
    };
  }
};

const minimaxAsync = (board, depth, maximizingPlayer) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = minimax(board, depth, maximizingPlayer);
      resolve(result);
    }, 100);
  });
};

module.exports = { 
  minimax,
  minimaxAsync
};