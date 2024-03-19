const { parseBoard, getPieceColor } = require('./helpers');

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
    if(board[newRow][newCol] === '0' && pinnedCount === 0){
      attackedSquares.push([newRow, newCol]);
      newRow += rowDirection;
      newCol += colDirection;
    }
    else if((board[newRow][newCol] === 'k' || board[newRow][newCol] === 'K') && getPieceColor(board[newRow][newCol]) !== color){
      attackedSquares.push([newRow, newCol]);
      newRow += rowDirection;
      newCol += colDirection;
      if(pinnedCount === 1) {
        pinnedPiece = {piece: posiblePin, pinDirection: `${rowDirection}${colDirection}` , pinType: 'soft'};
      }
    }
    else if(!(board[newRow][newCol] === 'k' || board[newRow][newCol] === 'K') && color !== getPieceColor(board[newRow][newCol])){
      if(pinnedCount === 0){
        posiblePin = [newRow, newCol];
        pinnedCount += 1;
      }
      else if(pinnedCount === 1){
        pinnedPiece = [];
        break;
      }
      attackedSquares.push([newRow, newCol]);
      newRow += rowDirection;
      newCol += colDirection;

    }
    else if(color === getPieceColor(board[newRow][newCol]) && pinnedCount === 0){
      attackedSquares.push([newRow, newCol]);
      break;
    }
    else{
      break;
    }
  }
  let result = {attackedSquares, pinnedPiece,}
  return result
};

const pawnAttackSqures = (row, col, color) => {
  const result = [];
  const direction = color === 'black' ? -1 : 1;
  if (col > 0) {
    result.push([row + direction, col - 1]);
  }
  if (col < 7) {
    result.push([row + direction, col + 1]);
  }
  return result;
}
const knightAttackSquares = (row, col) => {
  const result = [];
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
      result.push([newRow, newCol]);
    }
  }
  return result;
}

const kingAttackSquares = (row, col) => {
  const result = [];
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
  for (let i = 0; i < directions.length; i++) {
    const newRow = row + directions[i][0];
    const newCol = col + directions[i][1];
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      result.push([newRow, newCol]);
    }
  }
  return result;
}

const attackedSquaresCheck = (board, allyColor) =>{
  let attacksBoard = parseBoard('0000000000000000000000000000000000000000000000000000000000000000');
  let pinnedPieces = {}
  const verticalAndHorizontal = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];
  const diagonal = [
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1]
  ];
  board.forEach((row, rowIndex) => {
    row.forEach((piece, colIndex) => {
      if(piece === '0') return null;
      if(getPieceColor(piece) !== allyColor){
        if(piece.toLowerCase() === 'p'){
          let result = pawnAttackSqures(rowIndex, colIndex, allyColor);
          result.forEach((square) => {
            attacksBoard[square[0]][square[1]] ==='0' ? attacksBoard[square[0]][square[1]] = '1' : attacksBoard[square[0]][square[1]] = '2';
          });
          return null;
        }
        else if(piece.toLowerCase() === 'n'){
          let result = knightAttackSquares(rowIndex, colIndex)
          result.forEach((square) => {
            attacksBoard[square[0]][square[1]] ==='0' ? attacksBoard[square[0]][square[1]] = '1' : attacksBoard[square[0]][square[1]] = '2';
          });
          return null;
        }
        else if(piece.toLowerCase() === 'k'){
          let result = kingAttackSquares(rowIndex, colIndex)
          result.forEach((square) => {
            attacksBoard[square[0]][square[1]] ==='0' ? attacksBoard[square[0]][square[1]] = '1' : attacksBoard[square[0]][square[1]] = '2';
          });
          return null;
        }
        else {
          let directions = []
          if(piece.toLowerCase() === 'r'){
            directions  = verticalAndHorizontal
          }
          else if(piece.toLowerCase() === 'b'){
            directions = diagonal
          }
          else {
            directions = [...verticalAndHorizontal, ...diagonal]
          }
          directions.map((direction) => {
            let result = attackDirection(board, rowIndex, colIndex, direction[0], direction[1])
            result.attackedSquares.forEach((square) => {
              attacksBoard[square[0]][square[1]] ==='0' ? attacksBoard[square[0]][square[1]] = '1' : attacksBoard[square[0]][square[1]] = '2';
            });
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
          return null;
        }
      }
    })
  })

  let result = {attacksBoard, pinnedPieces}
  return result;
}

module.exports = {
  attackedSquaresCheck,
  attackDirection,
  pawnAttackSqures,
  knightAttackSquares,
  kingAttackSquares
};
