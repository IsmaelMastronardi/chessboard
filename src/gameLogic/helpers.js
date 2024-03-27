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

convertToBoard(initialPostion);

module.exports = {
  getPieceColor,
  isInCheckline,
  convertToBoard,
  parseBoard,
};