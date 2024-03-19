const { getPieceColor } = require('./helpers');

const callMoves = (board, allyColor, pinnedPieces, inCheck = false, checkDirection) => {
  let moves = {};
  board.forEach((row, rowIndex) => {
    row.forEach((piece, colIndex) => {
      if (getPieceColor(piece) === allyColor && piece !== '0') {
        if(inCheck && pinnedPieces[`${rowIndex}${colIndex}`]?.pinType === 'hard') return null;
        if(inCheck){

        }
        moves[`${rowIndex}${colIndex}`] = getPieceMoves(board, rowIndex, colIndex, pinnedPieces);
      }
    });
  });
  return moves;
}

const getPieceMoves = (board, row, col, pinnedPieces) => {
  const piece = board[row][col];
  if(pinnedPieces[`${row}${col}`]?.pinType === 'hard'){
    return [];
  }
  else {
    switch (piece.toLowerCase()) {
      case 'p':
        return pawnMoves(board, row, col);
      case 'r':
        if(pinnedPieces[`${row}${col}`]?.pinType === 'soft'){
          return rookMoves(board, row, col, pinnedPieces[`${row}${col}`].pinDirection);
        }
        return rookMoves(board, row, col);
      case 'n':
        return knightMoves(board, row, col);
      case 'b':
        if(pinnedPieces[`${row}${col}`]?.pinType === 'soft'){
          return bishopMoves(board, row, col, pinnedPieces[`${row}${col}`].pinDirection);
        }
        return bishopMoves(board, row, col);
      case 'q':
        if(pinnedPieces[`${row}${col}`]?.pinType === 'soft'){
          return queenMoves(board, row, col, pinnedPieces[`${row}${col}`].pinDirection);
        }
        return queenMoves(board, row, col);
      case 'k':
        return kingMoves(board, row, col);
      default:
        return [];
    }
  }
}

const kingMoves = (board, row, col) => {
  console.log('kingMoves');
}

const moveDirection = (board, row, col, rowDirection, colDirection) => {
  let newRow = row + rowDirection;
  let newCol = col + colDirection;
  let result = [];
  const piece = board[row][col];
  const color = getPieceColor(piece);

  while(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
    if(board[newRow][newCol] === '0'){
      result.push([newRow, newCol]);
      newRow += rowDirection;
      newCol += colDirection;
    }
    else if(color !== getPieceColor(board[newRow][newCol])){
      result.push([newRow, newCol]);
      break;
    }
    else{
      break;
    }
  }
  return result
}

const rookMoves = (board, row, col, pinDirection = '') => {
  const result = [];
  if(!pinDirection === ''){
    result.push(...moveDirection(board, row, col, pinDirection.charAt(0), pinDirection.charAt(1)));
    result.push(...moveDirection(board, row, col, Number(pinDirection.charAt(0)) * -1, Number(pinDirection.charAt(1)) * -1));
  }
  else {
    result.push(...moveDirection(board, row, col, 1, 0));
    result.push(...moveDirection(board, row, col, -1, 0));
    result.push(...moveDirection(board, row, col, 0, 1));
    result.push(...moveDirection(board, row, col, 0, -1));
  }
  return result;
}

const bishopMoves = (board, row, col, pinDirection = '') => {
  const result = [];
  if(!pinDirection === ''){
    result.push(...moveDirection(board, row, col, pinDirection.charAt(0), pinDirection.charAt(1)));
    result.push(...moveDirection(board, row, col, Number(pinDirection.charAt(0)) * -1, Number(pinDirection.charAt(1)) * -1));
  }
  else {
    result.push(...moveDirection(board, row, col, 1, 1));
    result.push(...moveDirection(board, row, col, -1, -1));
    result.push(...moveDirection(board, row, col, 1, -1));
    result.push(...moveDirection(board, row, col, -1, 1));
  }
  return result;
}

const queenMoves = (board, row, col, pinDirection = '') => {
  const result = [];
  if(!pinDirection === ''){
    result.push(...moveDirection(board, row, col, pinDirection.charAt(0), pinDirection.charAt(1)));
    result.push(...moveDirection(board, row, col, Number(pinDirection.charAt(0)) * -1, Number(pinDirection.charAt(1)) * -1));
  }
  else {
    result.push(...rookMoves(board, row, col));
    result.push(...bishopMoves(board, row, col));
  }
  return result;
}

const pawnMoves = (board, row, col) => {
  const result = [];
  const piece = board[row][col];
  const color = getPieceColor(piece);
  const direction = color === 'white' ? -1 : 1;
  if(board[row + direction][col] === '0'){
    result.push([row + direction, col]);
    if((color === 'white' && row === 6) || (color === 'black' && row === 1)){
      if(board[row + 2 * direction][col] === '0'){
        result.push([row + 2 * direction, col]);
      }
    }
  }
  if(board[row + direction][col + 1] !== '0' && getPieceColor(board[row + direction][col + 1]) !== color){
    result.push([row + direction, col + 1]);
  }
  if(board[row + direction][col - 1] !== '0' && getPieceColor(board[row + direction][col - 1]) !== color){
    result.push([row + direction, col - 1]);
  }
  return result;
}

const knightMoves = (board, row, col) => {
  const result = [];
  const piece = board[row][col];
  const color = getPieceColor(piece);
  const directions = [
    [2, 1],
    [2, -1],
    [1, 2],
    [1, -2],
    [-2, 1],
    [-2, -1],
    [-1, 2],
    [-1, -2]
  ];
  for (let i = 0; i < directions.length; i++) {
    const newRow = row + directions[i][0];
    const newCol = col + directions[i][1];
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      if (board[newRow][newCol] === '0' || getPieceColor(board[newRow][newCol]) !== color) {
        result.push([newRow, newCol]);
      }
    }
  }
  return result;
}

module.exports = {
  callMoves,
  getPieceColor,
  getPieceMoves,
  kingMoves,
}