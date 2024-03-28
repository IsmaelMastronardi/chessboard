/* eslint-disable no-unused-vars */
// const initialPostion = "3r1q1k/8/8/8/8/8/8/K1R1Q3";
const initialPostion = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const convertToBoard = (fen) => {
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
    result.push(temp.join(''));
  })
  return(result.join(''));
}

 const convertToFen = (board) => {
  const result = [];
  board.match(/.{1,8}/g).forEach((row, index) => {
    let count = 0;
    let temp = [];
    let splitted = row.split('');
    for(let i = 0; i<splitted.length; i++){
      if(isNaN(Number(splitted[i]))){
        if(count > 0){
          temp.push(count);
          count = 0;
        }
        temp.push(splitted[i]);
      }
      else{
        count += 1;
        if(i === 7){
          temp.push(count);
          count = 0;
        }
      }
    }
    if(index !== 7){result.push(temp.join('') + '/')}
    else{
      result.push(temp.join(''))
    }
  });
  return(result.join(''))
}

 const getPieceColor = (piece) => {
  if(piece === '0') return null;
  return piece === piece.toUpperCase() ? 'white' : 'black';
}

const displayBoard = (board) => {
  let result = [];
  let splitBoard = board.split('');
  splitBoard.forEach((piece, index) => {
    if(index % 8 === 0){
      result.push('\n');
    }
    result.push(piece);
  });
  return result.join('');
}

let board = convertToBoard(initialPostion);
console.log(board);




// export { convertToBoard, convertToFen, getPieceColor, moveVertical, moveHorizontal, moveDiagonal, generatePawnMoves, displayBoard };
