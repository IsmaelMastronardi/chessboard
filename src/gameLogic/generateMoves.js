const { kingMoves, callMoves, handleCheck } = require("./moves");
const { attackedSquaresCheck } = require("./attacks");
const { convertToBoard, getPieceColor } = require("./helpers");

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

const calculatePosibleMoves = (board, allyColor) => {
  let attacksAndPins = attackedSquaresCheck(board.pieces, allyColor);
  let attackBaord = attacksAndPins.attacksBoard;
  let pinnedPieces = attacksAndPins.pinnedPieces;
  let checkingPiecePosition = attacksAndPins.checkingPiecePosition;
  let moves = [];
  let kingPosition = searchKing(board.pieces, allyColor)
  console.log(attacksAndPins)
  if(attackBaord[kingPosition[0]][kingPosition[1]] === '2'){
    moves = kingMoves(board, kingPosition[0], kingPosition[1]);
    console.log('doble check')
    if(Object.keys(moves).length === 0){
      return 'checkmate';
    };
  }
  else if(attackBaord[kingPosition[0]][kingPosition[1]] === '1'){
   moves = handleCheck(board, attackBaord,kingPosition, allyColor, pinnedPieces, checkingPiecePosition);
   console.log('check')
   if(Object.keys(moves).length === 0){
    return 'checkmate';
  };
  }
  else{
    console.log('no check')
    moves = callMoves(board, allyColor, pinnedPieces, attackBaord);
  }
  return moves;
}

const initialPostion = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1";
const board = convertToBoard(initialPostion);

module.exports = { calculatePosibleMoves, searchKing };