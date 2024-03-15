/* eslint-disable no-unused-vars */
const initialPostion = "3r1q1k/8/8/8/8/8/8/K1R1Q3";

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

 const moveVertical = (board, position) => {
  let result = [];
  let splitBoard = board.split('');
  let piece = splitBoard[position];
  let color = getPieceColor(piece);
  let down = position - 8;
  let up = position + 8;
  while(up < 64){
    if(splitBoard[up] === '0'){
      result.push(up);
      up += 8;
    }
    else if(getPieceColor(splitBoard[up]) !== color){
      result.push(up);
      break;
    }
    else{
      break;
    }
  }
  while(down > 0){
    if(splitBoard[down] === '0'){
      result.push(down);
      down -= 8;
    }
    else if(getPieceColor(splitBoard[down]) !== color){
      result.push(down);
      break;
    }
    else{
      break;
    }
  }
  return result;
}

 const moveHorizontal = (board, position) => {
  let result = [];
  let splitBoard = board.split('');
  let piece = splitBoard[position];
  let color = getPieceColor(piece);
  let right = position + 1;
  let left = position - 1;
  let limitRight = Math.floor(position/8) * 8 + 8;
  let limitLeft = Math.floor(position/8) * 8;
  while(right < limitRight){
    if(splitBoard[right] === '0'){
      result.push(right);
      right += 1;
    }
    else if(getPieceColor(splitBoard[right]) !== color){
      result.push(right);
      break;
    }
    else{
      break;
    }
  }
  while(left > limitLeft){
    if(splitBoard[left] === '0'){
      result.push(left);
      left -= 1;
    }
    else if(getPieceColor(splitBoard[left]) !== color){
      result.push(left);
      break;
    }
    else{
      break;
    }
  }

  return result;
}

 const moveDiagonal = (board, position) => {
  let result = [];
  let splitBoard = board.split('');
  let piece = splitBoard[position];
  let color = getPieceColor(piece);
  let rightUp = position + 9;
  let rightDown = position - 7;
  let leftUp = position + 7;
  let leftDown = position - 9;
  let row = Math.floor(position/8);

  while(rightUp < 64 && rightUp % 8 !== 0 && row < Math.floor(rightUp/8)){
    if(splitBoard[rightUp] === '0'){
      result.push(rightUp);
      rightUp += 9;
    }
    else if(getPieceColor(splitBoard[rightUp]) !== color){
      result.push(rightUp);
      break;
    }
    else{
      break;
    }
  }
  while(rightDown > 0 && (rightDown + 7) % 8 !== 0 && row > Math.floor(rightDown/8)){
    if(splitBoard[rightDown] === '0'){
      result.push(rightDown);
      rightDown -= 7;
    }
    else if(getPieceColor(splitBoard[rightDown]) !== color){
      result.push(rightDown);
      break;
    }
    else{
      break;
    }
  }
  while(leftUp < 64 && (leftUp - 7) % 8 !== 0 && row < Math.floor(leftUp/8)){
    console.log(leftUp);
    if(splitBoard[leftUp] === '0'){
      result.push(leftUp);
      leftUp += 7;
    }
    else if(getPieceColor(splitBoard[leftUp]) !== color){
      result.push(leftUp);
      break;
    }
    else{
      break;
    }
  }
  while(leftDown > 0 && (leftDown + 9) % 8 !== 0 && row > Math.floor(leftDown/8)){
    if(splitBoard[leftDown] === '0'){
      result.push(leftDown);
      leftDown -= 9;
    }
    else if(getPieceColor(splitBoard[leftDown]) !== color){
      result.push(leftDown);
      break;
    }
    else{
      break;
    }
  }
  return result;
}


 const generatePawnMoves = (board, position) => {
  let result = [];
  let splitBoard = board.split('');
  let piece = splitBoard[position];
  let color = getPieceColor(piece);
  let direction = color === 'white' ? -1 : 1;
  if(splitBoard[position + (8 * direction)] === '0'){
    result.push(position + (8 * direction));
    if(color === 'black' && position < 16 && splitBoard[position + 16] === '0'){
      result.push(position + 16);
    }
    if(color === 'white' && position > 47 && splitBoard[position - 16] === '0'){
      result.push(position - 16);
    }
  }
  if(position % 8 !== 0 && splitBoard[position + (7 * direction)] !== '0' && getPieceColor(splitBoard[position + 7]) !== color){
    result.push(position + 7);
  }
  if((position + 1) % 8 !== 0 && splitBoard[position + (9 * direction)] !== '0' && getPieceColor(splitBoard[position + 9]) !== color){
    result.push(position + 9);
  }

return result;
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
