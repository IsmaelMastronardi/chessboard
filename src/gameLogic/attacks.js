const { parseBoard, getPieceColor } = require('./helpers');

const attackDirection = (board, row, col, rowDirection, colDirection) => {
  let newRow = row + rowDirection;
  let newCol = col + colDirection;
  let attackedSquares = [];
  let pinnedPiece = {};
  let possiblePin = []
  let pinnedCount = 0;
  const piece = board[row][col];
  const color = piece === piece.toLowerCase() ? 'black' : 'white';
  while(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
    if(board[newRow][newCol] !== '0'  && getPieceColor(board[newRow][newCol]) === color){
      attackedSquares.push([newRow, newCol]);
      break;
    }

    if (pinnedCount === 0) {
      if (board[newRow][newCol] === '0') {
        attackedSquares.push([newRow, newCol]);
        newRow += rowDirection;
        newCol += colDirection;
      } else if (board[newRow][newCol].toLowerCase() === 'k') {
        attackedSquares.push([newRow, newCol]);
        newRow += rowDirection;
        newCol += colDirection;
      } else {
        possiblePin = [newRow, newCol];
        pinnedCount = 1;
        attackedSquares.push([newRow, newCol]);
        newRow += rowDirection;
        newCol += colDirection;
      }
    } else if (pinnedCount === 1) {
      if (board[newRow][newCol] === '0') {
        newRow += rowDirection;
        newCol += colDirection;
      } else if (board[newRow][newCol].toLowerCase() === 'k') {
        pinnedPiece = { piece: possiblePin, pinDirection: [rowDirection, colDirection] };
        break;
      } else {
        break;
      }
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

const attackedSquaresCheck = (board, allyColor) => {
  let attacksBoard = parseBoard('0000000000000000000000000000000000000000000000000000000000000000');
  let pinnedPieces = {}
  let checkingPiecePosition = [];
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
      if(piece === '0' || getPieceColor(piece) === allyColor){return null};
      if(piece.toLowerCase() === 'p'|| piece.toLowerCase() === 'n'||piece.toLowerCase() === 'k'){
        let result = [];
        switch (piece.toLowerCase()) {
          case 'p':
            result = pawnAttackSqures(rowIndex, colIndex, allyColor);
            break;
          case 'n':
            result = knightAttackSquares(rowIndex, colIndex);
            break;
          case 'k':
            result = kingAttackSquares(rowIndex, colIndex);
            break;
          default:
            break;
        }
        result.forEach((square) => {
          const attackedPiece = board[square[0]][square[1]];
          if(attacksBoard[square[0]][square[1]] ==='0'){
            attacksBoard[square[0]][square[1]] = '1';
            if((attackedPiece === 'k' && allyColor === 'black') || (attackedPiece === 'K' && allyColor === 'white')){
              checkingPiecePosition = [rowIndex, colIndex];
            }
          }
          else if(attacksBoard[square[0]][square[1]] ==='1' && ((attackedPiece === 'k' && allyColor === 'black') || (attackedPiece === 'K' && allyColor === 'white'))){
            attacksBoard[square[0]][square[1]] = '2';
            checkingPiecePosition = [rowIndex, colIndex];
          }
        });
      }
      else {
        let directions = []
        switch (piece.toLowerCase()) {
          case 'r':
            directions  = verticalAndHorizontal
            break;
          case 'b':
            directions = diagonal
            break;
          default:
            directions = [...verticalAndHorizontal, ...diagonal]
            break;
        }
        directions.map((direction) => {
          let result = attackDirection(board, rowIndex, colIndex, direction[0], direction[1])
          result.attackedSquares.forEach((square) => {
            const attackedPiece = board[square[0]][square[1]];
            if(attacksBoard[square[0]][square[1]] ==='0'){
              attacksBoard[square[0]][square[1]] = '1';
              if((attackedPiece === 'k' && allyColor === 'black') || (attackedPiece === 'K' && allyColor === 'white')){
                checkingPiecePosition = [rowIndex, colIndex];
              }
            }
            else if(attacksBoard[square[0]][square[1]] ==='1' && (attackedPiece === 'k' || attackedPiece === 'K')){
              attacksBoard[square[0]][square[1]] = '2'; 
            }
          });
          if(result.pinnedPiece.piece){
            const key = `${result.pinnedPiece.piece[0]}${result.pinnedPiece.piece[1]}`;
            if (!pinnedPieces[key]) {
              pinnedPieces[key] = { pinDirection: result.pinnedPiece.pinDirection};
            }
          }
          return null;
        })
        return null;
      }
    })
  })
  let result = {attacksBoard, pinnedPieces, checkingPiecePosition};
    return result;
  }

  module.exports = {
    attackedSquaresCheck,
    attackDirection,
    pawnAttackSqures,
    knightAttackSquares,
    kingAttackSquares
  };
