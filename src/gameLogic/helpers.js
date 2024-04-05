const initialPostion = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const getPieceColor = (piece) => {
  return piece === piece.toLowerCase() ? 'black' : 'white';
}

const isInCheckline = (subArr, newRow, newCol) => JSON.stringify(subArr) === JSON.stringify([newRow, newCol]);

const  parseBoard = (boardString) => {
  const board = [];
  for (let i = 0; i < 8; i++) {
      const row = boardString.substr(i * 8, 8);
      board.push(row.split(''));
  }
  return board;
}

const transformFen = (fen) => {
  const result = [];
  const rows = fen.split('/');
  rows.forEach((row) => {
    let temp = [];
    row.split('').forEach((char) =>{
      if(isNaN(Number(char)) ){
        temp.push(char);
      }
      else{
        let val = Number(char);
        for(let i = 0; i<val; i++){
          temp.push('0');
        }
      }
    })
    result.push(temp);
  })
  return(result);
}

const convertToBoard = (fen) => {
  const result = {
    pieces: '',
    turn: '',
    castling: '',
    enPassant: '',
    halfMove: '',
    fullMove: '',
  };
  const splitedFen = fen.split(' ');
  const board = transformFen(splitedFen[0]);

  result.pieces = board;
  result.turn = splitedFen[1];
  result.castling = splitedFen[2];
  result.enPassant = splitedFen[3];
  result.halfMove = splitedFen[4];
  result.fullMove = splitedFen[5];
  return result
}

const convertToFen = (board) => {
  const boardString = board.pieces.map((row) => {
    let count = 0;
    let temp = [];
    for(let i = 0; i<row.length; i++){
      if(isNaN(Number(row[i]))){
        if(count > 0){
          temp.push(count);
          count = 0;
        }
        temp.push(row[i]);
      }
      else{
        count += 1;
        if(i === 7){
          temp.push(count);
          count = 0;
        }
      }
    }
    return temp.join('');
  }).join('/');
  return `${boardString} ${board.turn} ${board.castling} ${board.enPassant} ${board.halfMove} ${board.fullMove}`;
}

const finalizeMove = (board, oldIndex, newIndex) => {
  const movingPiece = board.pieces[oldIndex[0]][oldIndex[1]];
  const previousSquare = board.pieces[oldIndex[0]][oldIndex[1]];
  const currentPlayer = board.turn;
  board.pieces[oldIndex[0]][oldIndex[1]] = '0';
  board.pieces[newIndex[0]][newIndex[1]] = movingPiece;

  const castlingToRemove = new Set();

  if(currentPlayer === 'w'){
    board.turn = 'b';
    board.fullMove = Number(board.fullMove) + 1;
    board.halfMove = Number(board.halfMove) + 1;
    if(movingPiece === 'K'){
      castlingToRemove.add('K');
      castlingToRemove.add('Q');
    }
    if(movingPiece === 'R'){
      if(previousSquare[0] === 7 && previousSquare[1] === 0){
        castlingToRemove.add('Q');
      }
      if(previousSquare[0] === 7 && previousSquare[1] === 7){
        castlingToRemove.add('K');
      }
    }
    if(newIndex[0] === 0){
      if(newIndex[1] === 0){
        castlingToRemove.add('Q');
      }
      if(newIndex[1] === 7){
        castlingToRemove.add('K');
      }
    }
  }
  if(currentPlayer === 'b'){
    board.turn = 'w';
    board.halfMove = Number(board.halfMove) + 1;
    if(movingPiece === 'k'){
      castlingToRemove.add('k');
      castlingToRemove.add('q');
    }
    if(movingPiece === 'r'){
      if(previousSquare[0] === 0 && previousSquare[1] === 0){
        castlingToRemove.add('q');
      }
      if(previousSquare[0] === 0 && previousSquare[1] === 7){
        castlingToRemove.add('k');
      }
    }
    if(newIndex[0] === 7){
      if(newIndex[1] === 0){
        castlingToRemove.add('q');
      }
      if(newIndex[1] === 7){
        castlingToRemove.add('k');
      }
    }
  }
  castlingToRemove.forEach(right => {
    board.castling.replace(new RegExp(right, 'g'), '');
});

  return board;
}

module.exports = {
  getPieceColor,
  isInCheckline,
  convertToBoard,
  parseBoard,
  convertToFen,
};