const { getPieceColor } = require('./helpers');

const callMoves = (board, allyColor, pinnedPieces) => {
  let moves = {};
  board.pieces.forEach((row, rowIndex) => {
    row.forEach((piece, colIndex) => {
      if (getPieceColor(piece) === allyColor && piece !== '0') {
          moves[`${rowIndex}${colIndex}`] = getPieceMoves(board, rowIndex, colIndex, pinnedPieces);
      }
    });
  });
  return moves;
}

const calculateCheckLine = (board, checkingPiecePosition, kingPosition) => {
  let checkLine = [];
  let rowDirection = checkingPiecePosition[0] === kingPosition[0] ? 0 : checkingPiecePosition[0] > kingPosition[0] ? -1 : 1;
  let colDirection = checkingPiecePosition[1] === kingPosition[1] ? 0 : checkingPiecePosition[1] > kingPosition[1] ? -1 : 1;
  while(checkingPiecePosition[0] !== kingPosition[0] && checkingPiecePosition[1] !== kingPosition[1]){
    checkingPiecePosition[0] += rowDirection;
    checkingPiecePosition[1] += colDirection;
    checkLine.push(checkingPiecePosition);
  }
  return checkLine;
}

const handleCheck = (board, attackBaord,kingPosition, allyColor, pinnedPieces, checkingPiecePosition) => {
  let moves = {};
  let checkingPiece = attackBaord[checkingPiecePosition[0]][checkingPiecePosition[1]];
  let checkLine = [];
  if(!checkingPiece.toLowerCase() === 'p' && !checkingPiece.toLowerCase() === 'n'){
    const checkLine = calculateCheckLine(board, checkingPiecePosition, kingPosition)
  }
  board.pieces.forEach((row, rowIndex) => {
    row.forEach((piece, colIndex) => {
      if (getPieceColor(piece) === allyColor && piece !== '0') {
          moves[`${rowIndex}${colIndex}`] = getPieceMoves(board, rowIndex, colIndex, pinnedPieces, checkLine, checkingPiece, checkingPiecePosition);
      }
    });
  });
  return moves;
}

const getPieceMovesInCheck = (board, row, col, pinnedPieces, checkLine, checkingPiece, checkingPieceIndex) => {
  const piece = board.pieces[row][col];
  if(pinnedPieces[`${row}${col}`]){
    return [];
  }
  switch (piece.toLowerCase()) {
    case 'p':
      return pawnMovesInCheck(board, row, col, checkingPieceIndex, checkLine);
    case 'r':
      return rookMovesInCheck(board, row, col, checkingPieceIndex, checkLine);
    case 'n':
      return knightMovesInCheck(board, row, col, checkingPieceIndex, checkLine);
    case 'b':
      return bishopMovesInCheck(board, row, col, checkingPieceIndex, checkLine);
    case 'q':
      return queenMovesInCheck(board, row, col, checkingPieceIndex, checkLine);
    default:
      return [];
  }  
}

const getPieceMoves = (board, row, col, pinnedPieces) => {
  const piece = board.pieces[row][col];
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
      default:
        return [];
    }
  }
}

const kingMoves = (board, row, col, attackBaord) => {
  const moves = [];
  const color = getPieceColor(board.pieces[row][col]);
  const directions = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 1]
  ];
  directions.forEach(direction => {
    const newRow = row + direction[0];
    const newCol = col + direction[1];
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      if ((board.pieces[newRow][newCol] === '0' || color !== getPieceColor(board.pieces[newRow][newCol])) && attackBaord[newRow][newCol] !== '1') {
        moves.push([newRow, newCol]);
      }
    }
  });
  if(color === 'white' && board.castling.includes('K')){
    if(board.pieces[7][5] === '0' && board.pieces[7][6] === '0' && attackBaord[7][5] !== '1' && attackBaord[7][6] !== '1'){
      moves.push([7, 6]);
    } 
  }
  if(color === 'white' && board.castling.includes('Q')){
    if(board.pieces[7][1] === '0' && board.pieces[7][2] === '0' && board.pieces[7][3] === '0' && attackBaord[7][1] !== '1' && attackBaord[7][2] !== '1' && attackBaord[7][3] !== '1'){
      moves.push([7, 2]);
    } 
  }
  if(color === 'black' && board.castling.includes('k')){
    if(board.pieces[0][5] === '0' && board.pieces[0][6] === '0' && attackBaord[0][5] !== '1' && attackBaord[0][6] !== '1'){
      moves.push([0, 6]);
    } 
  }
  if(color === 'black' && board.castling.includes('q')){
    if(board.pieces[0][1] === '0' && board.pieces[0][2] === '0' && board.pieces[0][3] === '0' && attackBaord[0][1] !== '1' && attackBaord[0][2] !== '1' && attackBaord[0][3] !== '1'){
      moves.push([0, 2]);
    } 
  }
  return moves;
}

const moveDirection = (board, row, col, rowDirection, colDirection) => {
  let newRow = row + rowDirection;
  let newCol = col + colDirection;
  let result = [];
  const piece = board.pieces[row][col];
  const color = getPieceColor(piece);

  while(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
    if(board.pieces[newRow][newCol] === '0'){
      result.push([newRow, newCol]);
      newRow += rowDirection;
      newCol += colDirection;
    }
    else if(color !== getPieceColor(board.pieces[newRow][newCol])){
      result.push([newRow, newCol]);
      break;
    }
    else{
      break;
    }
  }
  return result
}

const moveDirectionInCheck = (board, row, col, rowDirection, colDirection, checkingPieceIndex, checkLine) => {
  let newRow = row + rowDirection;
  let newCol = col + colDirection;
  let result = [];
  const piece = board.pieces[row][col];
  const color = getPieceColor(piece);

  while(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
    if(board.pieces[newRow][newCol] === '0' && checkLine.includes([newRow, newCol])){
      result.push([newRow, newCol]);
      newRow += rowDirection;
      newCol += colDirection;
    }
    else if(color !== getPieceColor(board[newRow][newCol]) && checkingPieceIndex === `${newRow}${newCol}`){
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

const rookMovesInCheck = (board, row, col, pinDirection = '', checkingPieceIndex, checkLine) => {
  const result = [];
  if(!pinDirection === ''){
    return [];
  }
  else {
    result.push(...moveDirection(board, row, col, 1, 0, checkingPieceIndex, checkLine));
    result.push(...moveDirection(board, row, col, -1, 0, checkingPieceIndex, checkLine));
    result.push(...moveDirection(board, row, col, 0, 1, checkingPieceIndex, checkLine));
    result.push(...moveDirection(board, row, col, 0, -1, checkingPieceIndex, checkLine));
  }
  return result;
}

const bishopMovesInCheck = (board, row, col, pinDirection = '', checkingPieceIndex, checkLine) => {
  const result = [];
  if(!pinDirection === ''){
    return [];
  }
  else {
    result.push(...moveDirection(board, row, col, 1, 1, checkingPieceIndex, checkLine));
    result.push(...moveDirection(board, row, col, -1, -1, checkingPieceIndex, checkLine));
    result.push(...moveDirection(board, row, col, 1, -1, checkingPieceIndex, checkLine));
    result.push(...moveDirection(board, row, col, -1, 1, checkingPieceIndex, checkLine));
  }
  return result;
}

const queenMovesInCheck = (board, row, col, pinDirection = '', checkingPieceIndex, checkLine) => {
  const result = [];
  if(!pinDirection === ''){
    return [];
  }
  else {
    result.push(...rookMoves(board, row, col, checkingPieceIndex, checkLine));
    result.push(...bishopMoves(board, row, col, checkingPieceIndex, checkLine));
  }
  return result;
}

const pawnMoves = (board, row, col) => {
  const result = [];
  const piece = board.pieces[row][col];
  const color = getPieceColor(piece);
  const direction = color === 'white' ? -1 : 1;
  if(board.pieces[row + direction][col + 1] !== '0' && getPieceColor(board.pieces[row + direction][col + 1]) !== color){
    result.push([row + direction, col + 1]);
  }
  if(board.pieces[row + direction][col - 1] !== '0' && getPieceColor(board.pieces[row + direction][col - 1]) !== color){
    result.push([row + direction, col - 1]);
  }
  if(board.pieces[row + direction][col] === '0'){
    result.push([row + direction, col]);
    if((color === 'white' && row === 6) || (color === 'black' && row === 1)){
      if(board.pieces[row + 2 * direction][col] === '0'){
        result.push([row + 2 * direction, col]);
      }
    }
  }
  return result;
}

const pawnMovesInCheck = (board, row, col, checkingPieceIndex, checkLine ) => {
  const result = [];
  const piece = board.pieces[row][col];
  const color = getPieceColor(piece);
  const direction = color === 'white' ? -1 : 1;
  if(board.pieces[row + direction][col + 1] !== '0' && getPieceColor(board.pieces[row + direction][col + 1]) !== color && checkingPieceIndex === `${row + direction}${col + 1}`){
    result.push([row + direction, col + 1]);
  }
  if(board.pieces[row + direction][col - 1] !== '0' && getPieceColor(board.pieces[row + direction][col - 1]) !== color && checkingPieceIndex === `${row + direction}${col - 1}`){
    result.push([row + direction, col - 1]);
  }
  if(board.pieces[row + direction][col] === '0'){
    if(checkLine.includes([row + direction, col])){
    result.push([row + direction, col]);
    }
    if(((color === 'white' && row === 6) || (color === 'black' && row === 1)) &&  checkLine.includes([row + 2 * direction, col])){
      if(board.pieces[row + 2 * direction][col] === '0'){
        result.push([row + 2 * direction, col]);
      }
    }
  }
  return result;
}

const knightMoves = (board, row, col) => {
  const result = [];
  const piece = board.pieces[row][col];
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
      if (board.pieces[newRow][newCol] === '0' || getPieceColor(board.pieces[newRow][newCol]) !== color) {
        result.push([newRow, newCol]);
      }
    }
  }
  return result;
}
const knightMovesInCheck = (board, row, col, checkingPieceIndex, checkLine) => {
  const result = [];
  const piece = board.pieces[row][col];
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
      if ((board.pieces[newRow][newCol] === '0' || getPieceColor(board.pieces[newRow][newCol]) !== color) && (checkLine.includes([newRow, newCol]) || checkingPieceIndex === `${newRow}${newCol}`)) {
        result.push([newRow, newCol]);
      }
    }
  }
  return result;
}

module.exports = {
  callMoves,
  handleCheck,
  getPieceColor,
  getPieceMoves,
  kingMoves,
}