function parseBoard(boardString) {
  const board = [];
  for (let i = 0; i < 8; i++) {
      const row = boardString.substr(i * 8, 8);
      board.push(row.split(''));
  }
  return board;
}
const getPieceColor = (piece) => {
  return piece === piece.toLowerCase() ? 'black' : 'white';
}

const getPieceMoves = (board, row, col) => {
  const piece = board[row][col];
  switch (piece.toLowerCase()) {
    case 'p':
      return pawnMoves(board, row, col);
    case 'r':
      return rookMoves(board, row, col);
    case 'n':
      return knightMoves(board, row, col);
    case 'b':
      return bishopMoves(board, row, col);
    case 'q':
      return queenMoves(board, row, col);
    case 'k':
      return kingMoves(board, row, col);
    default:
      return [];
  }
}

const kingMoves = (board, row, col) => {
}

const moveDirection = (board, row, col, rowDirection, colDirection) => {
  let newRow = row + rowDirection;
  let newCol = col + colDirection;
  let result = [];
  const piece = board[row][col];
  const color = piece === piece.toLowerCase() ? 'black' : 'white';

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

const rookMoves = (board, row, col) => {
  const result = [];
  result.push(...moveDirection(board, row, col, 1, 0));
  result.push(...moveDirection(board, row, col, -1, 0));
  result.push(...moveDirection(board, row, col, 0, 1));
  result.push(...moveDirection(board, row, col, 0, -1));
  return result;
}

const bishopMoves = (board, row, col) => {
  const result = [];
  result.push(...moveDirection(board, row, col, 1, 1));
  result.push(...moveDirection(board, row, col, -1, -1));
  result.push(...moveDirection(board, row, col, 1, -1));
  result.push(...moveDirection(board, row, col, -1, 1));
  return result;
}

const queenMoves = (board, row, col) => {
  const result = [];
  result.push(...rookMoves(board, row, col));
  result.push(...bishopMoves(board, row, col));
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

const directionSafetyScan = (board, row, col, rowDirection, colDirection) => {
  let newRow = row + rowDirection;
  let newCol = col + colDirection;
  let result = [];
  const piece = board[row][col];
  const color = getPieceColor(piece);

  let allyCount = 0;
  let pinnedPiece = []
  let possiblePinnedPiece = []
  let inCheck = false
  while(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
    if(board[newRow][newCol] === '0'){
      newRow += rowDirection;
      newCol += colDirection;
    }
    else if(color === getPieceColor(board[newRow][newCol])){
      allyCount += 1;
      if(allyCount === 1){
        possiblePinnedPiece = [newRow, newCol];
      }
      else{
        possiblePinnedPiece = [];
        break;
      }
    }
    else if(color !== getPieceColor(board[newRow][newCol])){
      if(allyCount === 0){
        
        result.push([newRow, newCol]);
      }
      break;
    }
    else{
      break;
    }
  }
  return result
}


const boardString = "rnbqkbnrpppppppp00000000000000000000000000000000PPPPPPPPRNBQKBNR";
const board = parseBoard(boardString);
console.log(knightMoves(board, 2, 1));
