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
  // console.log('depth', depth);
  // console.log('board', board);
  if (depth === 0) {
    return {
      value: calculatePositionValue(board.pieces, board.turn === 'w' ? 'white' : 'black'),
      move: null // No move at this stage
    };
  } else {
    const moves = calculatePosibleMoves(board, board.turn === 'w' ? 'white' : 'black');
    if (moves === 'checkmate') {
      return {
        value: maximizingPlayer ? -Infinity : Infinity,
        move: null // No move at this stage
      };
    }
    if (moves === 'stalemate') {
      return {
        value: 0,
        move: null // No move at this stagen
      };
    }
    let bestValue = maximizingPlayer ? -Infinity : Infinity;
    let bestMove = null; // Initialize best move to null
    for (const key in moves) {
      for (const move of moves[key]) {
        const newBoard = JSON.parse(JSON.stringify(board));;
        finalizeMove(newBoard, key, move);
        const { value } = minimax(newBoard, depth - 1, !maximizingPlayer);
        if ((maximizingPlayer && value > bestValue) || (!maximizingPlayer && value < bestValue)) {
          bestValue = value;
          console.log('move',move, 'value', value)
          bestMove = { piece: key, move : move.move }; // Store the best move
        }
      }
    }
    return {
      value: bestValue,
      bestMove,
    };
  }
};


const initialPostion = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const secondPosition = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 1 1";
const board = convertToBoard(secondPosition);
const move  = minimax(board, 4, true);
console.log(move);