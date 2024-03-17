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

// const directionSafetyScan = (board, row, col, rowDirection, colDirection) => {
//   let newRow = row + rowDirection;
//   let newCol = col + colDirection;
//   let result = [];
//   const piece = board[row][col];
//   const color = getPieceColor(piece);

//   let allyCount = 0;
//   let pinnedPiece = []
//   let possiblePinnedPiece = []
//   let inCheck = false
//   while(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
//     if(board[newRow][newCol] === '0'){
//       newRow += rowDirection;
//       newCol += colDirection;
//     }
//     else if(color === getPieceColor(board[newRow][newCol])){
//       allyCount += 1;
//       if(allyCount === 1){
//         possiblePinnedPiece = [newRow, newCol];
//       }
//       else{
//         possiblePinnedPiece = [];
//         break;
//       }
//     }
//     else if(color !== getPieceColor(board[newRow][newCol])){
 
//     }
//     else{
//       break;
//     }
//   }
//   return result
// }

const attackDirection = (board, row, col, rowDirection, colDirection) => {
  let newRow = row + rowDirection;
  let newCol = col + colDirection;
  let attackedSquares = [];
  let pinnedPiece = {};
  let posiblePin = []
  let pinnedCount = 0;
  const piece = board[row][col];
  const color = piece === piece.toLowerCase() ? 'black' : 'white';
  while(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
    console.log(newRow, newCol, board[newRow][newCol])
    if(board[newRow][newCol] === '0' && pinnedCount === 0){
      console.log('first')
      attackedSquares.push([newRow, newCol]);
      newRow += rowDirection;
      newCol += colDirection;
    }
    else if((board[newRow][newCol] === 'k' || board[newRow][newCol] === 'K') && getPieceColor(board[newRow][newCol]) !== color){
      console.log('second')
      attackedSquares.push([newRow, newCol]);
      newRow += rowDirection;
      newCol += colDirection;
      if(pinnedCount === 1) {
        pinnedPiece = {piece: posiblePin, pinDirection: [rowDirection, colDirection], pinType: 'soft'};
      }
    }
    else if(!(board[newRow][newCol] === 'k' || board[newRow][newCol] === 'K') && color !== getPieceColor(board[newRow][newCol])){
      if(pinnedCount === 0){
        console.log('third')
        posiblePin = [newRow, newCol];
        pinnedCount += 1;
      }
      else if(pinnedCount === 1){
        console.log('fourth')
        pinnedPiece = [];
        break;
      }
      console.log('fifth')
      attackedSquares.push([newRow, newCol]);
      newRow += rowDirection;
      newCol += colDirection;

    }
    else{
      console.log('sixth')
      break;
    }
  }
  let result = {attackedSquares, pinnedPiece,}
  return result
};

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1]
];

const attackedSquaresCheck = (board, color) =>{
  let attackedSquares = new Set()
  let pinnedPieces = {}
  board.forEach((row, rowIndex) => {
    row.forEach((piece, colIndex) => {
      if(getPieceColor(piece) !== color){
        directions.map((direction) => {
          let result = attackDirection(board, rowIndex, colIndex, direction[0], direction[1])
          attackedSquares = new Set([...attackedSquares, ...result.attackedSquares])
          console.log(result)
          if(result.pinnedPiece.piece){
            const key = `${result.pinnedPiece.piece[0]}${result.pinnedPiece.piece[1]}`;
            if (!pinnedPieces[key]) {
              pinnedPieces[key] = { pinDirection: result.pinnedPiece.pinDirection, pinType: result.pinnedPiece.pinType };
            }
            else{
              pinnedPieces[key].pinType = 'hard'
            }
          }
          return null;
        })
      }
    })
  })

  let result = {attackedSquares, pinnedPieces}
  return result;
}


const boardString = "rnbqkbnrpppppppp00000000000000000000000000000000PPPPPPPPRNBQKBNR";
const board = parseBoard(boardString);
console.log(attackedSquaresCheck(board, 'black'));
