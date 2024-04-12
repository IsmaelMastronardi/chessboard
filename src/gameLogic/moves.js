const { getPieceColor, isInCheckline } = require('./helpers');

const calculateCheckLine = (checkingPiecePosition, kingPosition) => {
  let checkLine = [];
  let temp = [...checkingPiecePosition];
  let rowDirection = temp[0] === kingPosition[0] ? 0 : temp[0] > kingPosition[0] ? -1 : 1;
  let colDirection = temp[1] === kingPosition[1] ? 0 : temp[1] > kingPosition[1] ? -1 : 1;
  while((temp[0] !== kingPosition[0] && temp[1] !== kingPosition[1])){
    temp[0] += rowDirection;
    temp[1] += colDirection;
    checkLine.push([temp[0], temp[1]]);
  }
  return checkLine;
}

const callMoves = (board, allyColor, pinnedPieces ,attackBoard) => {
  let moves = {};
  board.pieces.forEach((row, rowIndex) => {
    row.forEach((piece, colIndex) => {
      if (getPieceColor(piece) === allyColor && piece !== '0') {
        let pieceMoves = getPieceMoves(board, rowIndex, colIndex, pinnedPieces, attackBoard);
        if(pieceMoves.length > 0){
          moves[`${rowIndex}${colIndex}`] = pieceMoves;
        }
      }
    });
  });
  return moves;
}

const handleCheck = (board, attackBoard, kingPosition, allyColor, pinnedPieces, checkingPiecePosition) => {
  let moves = {};
  let checkLine = [];
  checkLine = calculateCheckLine(checkingPiecePosition, kingPosition)
  board.pieces.forEach((row, rowIndex) => {
    row.forEach((piece, colIndex) => {
      if (getPieceColor(piece) === allyColor && piece !== '0') {
        let  pieceMoves = getPieceMovesInCheck(board, rowIndex, colIndex, pinnedPieces, checkLine, checkingPiecePosition, attackBoard);
        if(pieceMoves.length > 0){
          moves[`${rowIndex}${colIndex}`] = pieceMoves;
        }
      }
    });
  });
  return moves;
}


const getPieceMoves = (board, row, col, pinnedPieces, attackBoard) => {
  const piece = board.pieces[row][col];
  switch (piece.toLowerCase()) {
    case 'p':
      if(pinnedPieces[`${row}${col}`]){
        return pawnMoves(board, row, col, pinnedPieces[`${row}${col}`].pinDirection);
      }
      return pawnMoves(board, row, col);
    case 'r':
      if(pinnedPieces[`${row}${col}`]){
        return rookMoves(board, row, col, pinnedPieces[`${row}${col}`].pinDirection);
      }
      return rookMoves(board, row, col);
    case 'n':
      if(pinnedPieces[`${row}${col}`]){
        return [];
      }
      return knightMoves(board, row, col);
    case 'k':
      return kingMoves(board, row, col, attackBoard);
    case 'b':
      if(pinnedPieces[`${row}${col}`]){
        return bishopMoves(board, row, col, pinnedPieces[`${row}${col}`].pinDirection);
      }
      return bishopMoves(board, row, col);
    case 'q':
      if(pinnedPieces[`${row}${col}`]){
        return queenMoves(board, row, col, pinnedPieces[`${row}${col}`].pinDirection);
      }
      return queenMoves(board, row, col);
    default:
      return [];
  }
}


const getPieceMovesInCheck = (board, row, col, pinnedPieces, checkLine, checkingPieceIndex, attackBoard) => {
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
    case 'k':
      return kingMoves(board, row, col, attackBoard);
    default:
      return [];
  }  
}

const kingMoves = (board, row, col, attackBoard) => {
  const moves = [];
  const color = getPieceColor(board.pieces[row][col]);
  const directions = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],

  ];
  directions.forEach(direction => {
    const newRow = row + direction[0];
    const newCol = col + direction[1];
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      if ((board.pieces[newRow][newCol] === '0' || color !== getPieceColor(board.pieces[newRow][newCol])) && attackBoard[newRow][newCol] === '0') {
        moves.push([newRow, newCol]);
      }
    }
  });
  if(color === 'white' && board.castling.includes('K')){
    if(board.pieces[7][5] === '0' && board.pieces[7][6] === '0' && attackBoard[7][5] !== '1' && attackBoard[7][6] !== '1'){
      moves.push([7, 6]);
    } 
  }
  if(color === 'white' && board.castling.includes('Q')){
    if(board.pieces[7][1] === '0' && board.pieces[7][2] === '0' && board.pieces[7][3] === '0' && attackBoard[7][1] !== '1' && attackBoard[7][2] !== '1' && attackBoard[7][3] !== '1'){
      moves.push([7, 2]);
    } 
  }
  if(color === 'black' && board.castling.includes('k')){
    if(board.pieces[0][5] === '0' && board.pieces[0][6] === '0' && attackBoard[0][5] !== '1' && attackBoard[0][6] !== '1'){
      moves.push([0, 6]);
    } 
  }
  if(color === 'black' && board.castling.includes('q')){
    if(board.pieces[0][1] === '0' && board.pieces[0][2] === '0' && board.pieces[0][3] === '0' && attackBoard[0][1] !== '1' && attackBoard[0][2] !== '1' && attackBoard[0][3] !== '1'){
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
  let color = getPieceColor(board.pieces[row][col]);
  while(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
    if(board.pieces[newRow][newCol] !== '0' && color === getPieceColor(board.pieces[newRow][newCol])){
      break;
    }
    if(board.pieces[newRow][newCol] !== '0' && color !== getPieceColor(board.pieces[newRow][newCol])){
      if(checkingPieceIndex[0] === newRow && checkingPieceIndex[1] === newCol){
        result.push([newRow, newCol]);
      }
      break;
    }
    ((newRow, newCol) => {
      if(board.pieces[newRow][newCol] === '0' && checkLine.some(subArr => isInCheckline(subArr, newRow, newCol))){
        result.push([newRow, newCol]);
        newRow += rowDirection;
        newCol += colDirection;
      }
    })(newRow, newCol);
    newRow += rowDirection;
    newCol += colDirection;
  }
  return result
}


const rookMoves = (board, row, col, pinDirection = '') => {
  const result = [];
  if(pinDirection === ''){
    result.push(...moveDirection(board, row, col, 1, 0));
    result.push(...moveDirection(board, row, col, -1, 0));
    result.push(...moveDirection(board, row, col, 0, 1));
    result.push(...moveDirection(board, row, col, 0, -1));
  }
  else {
    result.push(...moveDirection(board, row, col, pinDirection[0], pinDirection[1]));
    result.push(...moveDirection(board, row, col, pinDirection[0] * -1, pinDirection[1] * -1));
  }
  return result;
}

const bishopMoves = (board, row, col, pinDirection = '') => {
  const result = [];
  if(pinDirection === ''){
    result.push(...moveDirection(board, row, col, 1, 1));
    result.push(...moveDirection(board, row, col, -1, -1));
    result.push(...moveDirection(board, row, col, 1, -1));
    result.push(...moveDirection(board, row, col, -1, 1));
  }
  else {
    result.push(...moveDirection(board, row, col, pinDirection[0], pinDirection[1]));
    result.push(...moveDirection(board, row, col, pinDirection[0] * -1, pinDirection[1] * -1));
  }
  return result;
}

const queenMoves = (board, row, col, pinDirection = '') => {
  const result = [];
  if(pinDirection === ''){
    result.push(...rookMoves(board, row, col));
    result.push(...bishopMoves(board, row, col));
  }
  else {
    result.push(...moveDirection(board, row, col, pinDirection[0], pinDirection[1]));
    result.push(...moveDirection(board, row, col, pinDirection[0] * -1, pinDirection[1] * -1));
  }
  return result;
}

const rookMovesInCheck = (board, row, col, checkingPieceIndex, checkLine) => {
  const result = [];
  result.push(...moveDirectionInCheck(board, row, col, 1, 0, checkingPieceIndex, checkLine));
  result.push(...moveDirectionInCheck(board, row, col, -1, 0, checkingPieceIndex, checkLine));
  result.push(...moveDirectionInCheck(board, row, col, 0, 1, checkingPieceIndex, checkLine));
  result.push(...moveDirectionInCheck(board, row, col, 0, -1, checkingPieceIndex, checkLine));
  return result;
}

const bishopMovesInCheck = (board, row, col, checkingPieceIndex, checkLine) => {
  const result = [];
  result.push(...moveDirectionInCheck(board, row, col, 1, 1, checkingPieceIndex, checkLine));
  result.push(...moveDirectionInCheck(board, row, col, -1, -1, checkingPieceIndex, checkLine));
  result.push(...moveDirectionInCheck(board, row, col, 1, -1, checkingPieceIndex, checkLine));
  result.push(...moveDirectionInCheck(board, row, col, -1, 1, checkingPieceIndex, checkLine));
  return result;
}

const queenMovesInCheck = (board, row, col, checkingPieceIndex, checkLine) => {
  const result = [];
  result.push(...rookMovesInCheck(board, row, col, checkingPieceIndex, checkLine));
  result.push(...bishopMovesInCheck(board, row, col, checkingPieceIndex, checkLine));
  return result;
}

const pawnMoves = (board, row, col, pinDirection = '') => {
  const result = [];
  const piece = board.pieces[row][col];
  const color = getPieceColor(piece);
  const rowDirection = color === 'white' ? -1 : 1;
  const colDirections = [1, -1];
  colDirections.forEach((colDirection) => {
    const targetSquare = board.pieces[row + rowDirection][col + colDirection];
    if(col + colDirection < 0 || col + colDirection >= 8){
      return;
    }
    if(targetSquare === '0' || getPieceColor(targetSquare) === color){
      if(pinDirection === '' && board.enPassant === `${row + rowDirection}${col + colDirection}`){
        result.push([row + rowDirection, col + colDirection]);
      }
      return;
    }
    if((pinDirection === '' || (pinDirection[0] === rowDirection * -1 && pinDirection[1] === colDirection * -1))){
      result.push([row + rowDirection, col + colDirection]);
    }
  });
  if(board.pieces[row + rowDirection][col] === '0' && (pinDirection === '' || (pinDirection[0] === rowDirection * -1 && pinDirection[1] === 0))){
    result.push([row + rowDirection, col]);
    if((color === 'white' && row === 6) || (color === 'black' && row === 1)){
      if(board.pieces[row + 2 * rowDirection][col] === '0'){
        result.push([row + 2 * rowDirection, col]);
      }
    }
  }
  return result;
}

const pawnMovesInCheck = (board, row, col, checkingPieceIndex, checkLine) => {
  const result = [];
  const piece = board.pieces[row][col];
  const color = getPieceColor(piece);
  const direction = color === 'white' ? -1 : 1;
  if((row + direction >= 0 && row + direction < 8)){
    if(
      col + 1 < 8
      &&
      board.pieces[row + direction][col + 1] !== '0'
      &&
      getPieceColor(board.pieces[row + direction][col + 1]) !== color
      &&
      (checkingPieceIndex[0] === row + direction && checkingPieceIndex[1] === col + 1)
      ){
      result.push([row + direction, col + 1]);
    }
    if(
      col - 1 > 0
      &&
      board.pieces[row + direction][col - 1] !== '0'
      &&
      getPieceColor(board.pieces[row + direction][col - 1]) !== color
      &&
      (
        checkingPieceIndex[0] === row + direction
        &&
        checkingPieceIndex[1] === col - 1
      )
      ){
      result.push([row + direction, col - 1]);
    }
  }
  
  if(board.pieces[row + direction][col] === '0'){
    if(checkLine.some(subArr => isInCheckline(subArr, row + direction, col))){
    result.push([row + direction, col]);
    }
    if(((color === 'white' && row === 6) || (color === 'black' && row === 1)) && checkLine.some(subArr => isInCheckline(subArr, row + 2 * direction, col))){
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
      let currentSquare = board.pieces[newRow][newCol];
      if (
        (currentSquare === '0' || getPieceColor(currentSquare) !== color)
        &&
        (
          checkLine.some(subArr => isInCheckline(subArr, newRow, newCol))
        ||
          (checkingPieceIndex[0] === newRow && checkingPieceIndex[1] === newCol)
        )) 
        {
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