const { kingMoves, callMoves } = require("./moves");
const { attackedSquaresCheck } = require("./attacks");
const { parseBoard, getPieceColor } = require("./helpers");

const searchKing = (board, color) => {
  let king = [];
  board.forEach((row, rowIndex) => {
    row.forEach((piece, colIndex) => {
      if (piece.toLowerCase() === 'k' && getPieceColor(piece) === color) {
        king = [rowIndex, colIndex];
        return king;
      }
    });
  });
  return king;
}

const generateMoves = (board, allyColor) => {
  let attacksAndPins = attackedSquaresCheck(board, allyColor);
  let attackBaord = attacksAndPins.attacksBoard;
  let pinnedPieces = attacksAndPins.pinnedPieces;
  let checkingPieceDirection = attacksAndPins.checkingPieceDirection;
  console.log(attacksAndPins)
  let moves = [];
  let kingPosition = searchKing(board, allyColor)
  console.log(kingPosition);  

  if(attackBaord[kingPosition[0]][kingPosition[1]] === '2'){
    moves = kingMoves(board, kingPosition[0], kingPosition[1]);
    if(moves.length === 0){
      return 'checkmate';
    };
  }
  else if(attackBaord[kingPosition[0]][kingPosition[1]] === '1'){
   moves = callMoves(board, allyColor, pinnedPieces, true, );
  }
  else{
    moves = callMoves(board, allyColor, pinnedPieces);
  }
  return moves;
}
// '3k4/3n4/8/8/8/8/3Q4/3K4'

// const boardString = "rnbqkbnrpppppppp00000000000000000000000000000000PPPPPPPPRNBQKBNR";
const boardString = "0000k0000000n000000000000000000000000000000000000000Q0000000K0000";
const board = parseBoard(boardString);
generateMoves(board, 'black');
