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

const rowToLetters = (row) => {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  return letters[row];
}
const letterToNumbers = (letter) => {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  return letters.indexOf(letter);
}

const transformFen = (board) => {
  const result = [];
  const rows = board.split('/');
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
  result.enPassant = `${letterToNumbers(splitedFen[3][0])}${splitedFen[3][1]}`;
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
  const fenEnPassant = `${rowToLetters(board.enPassant[0])}${board.enPassant[1]}`
  return `${boardString} ${board.turn} ${board.castling} ${fenEnPassant} ${board.halfMove} ${board.fullMove}`;
}

module.exports = {
  getPieceColor,
  isInCheckline,
  convertToBoard,
  parseBoard,
  convertToFen,
};