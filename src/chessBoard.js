// let fullBoard = Array(64).fill(0)

// let blackPawnBoard = Array(64).fill(0);
// let blackRookBoard = Array(64).fill(0);
// let blackBishopBoard = Array(64).fill(0);
// let blackKnightBoard = Array(64).fill(0);
// let blackQueenBoard = Array(64).fill(0);
// let blackKingBoard = Array(64).fill(0);

// let whitePawnBoard = Array(64).fill(0);
// let whiteRookBoard = Array(64).fill(0);
// let whiteBishopBoard = Array(64).fill(0);
// let whiteKnightBoard = Array(64).fill(0);
// let whiteQueenBoard = Array(64).fill(0);
// let whiteKingBoard = Array(64).fill(0);


// function setSquare(board, index) {
//   board[index] = 1;
//   fullBoard[index] = 1;
// }

// function populateBoard(board, indexes){
//   indexes.forEach(el => {
//     setSquare(board, el)
//   });
// }

// function displayBoard(bitboard) {
//   for (let rank = 0; rank <= 7; rank++) {
//     let row = "";
//     for (let file = 0; file < 8; file++) {
//       const index = rank * 8 + file;
//       row += bitboard[index] + " ";
//     }
//     console.log(row);
//   }
// }

// populateBoard(blackPawnBoard, [8,9,10,11,12,13,14,15]);
// populateBoard(blackRookBoard, [0,7]);
// populateBoard(blackKnightBoard, [1,6]);
// populateBoard(blackBishopBoard, [2,5]);
// populateBoard(blackQueenBoard, [3]);
// populateBoard(blackKingBoard, [4]);

// populateBoard(whitePawnBoard, [48,49,50,51,52,53,54,55]);
// populateBoard(whiteRookBoard, [56, 63]);
// populateBoard(whiteKnightBoard, [57,62]);
// populateBoard(whiteBishopBoard, [58,61]);
// populateBoard(whiteQueenBoard, [59]);
// populateBoard(whiteKingBoard, [60]);


// displayBoard(fullBoard);


// class Board {
//   constructor(){
//     this.board = Array(64).fill(0)
//     this.moveList  = null
//   }

//   setSquare(square){ 
//     this.board[square] === 0 ? this.board[square] = 1 : this.board[square] = 0
//   }

//   clearSquare(square){
//     this.board[square] = 0
//   }

//   isSquareEmpty(square){
//     return this.board[square] === 0
//   }

//   generateMoves(){
//     return
//   }

//   displayBoard() {
//     for (let rank = 0; rank <= 7; rank++) {
//       let row = "";
//       for (let file = 0; file < 8; file++) {
//         const index = rank * 8 + file;
//         row += this.board[index] + " ";
//       }
//       console.log(row);
//     }
//   }
// }

// class WhitePawnBoard extends Board{

//   generateMoves(){
    
//   }
// }

// const myBoard = new WhitePawnBoard();
// myBoard.setSquare(0)
// myBoard.displayBoard()


// class Board {
//   constructor(){
//     this.board = Array(64).fill(0)
//   }

//   setSquare(square, value){ 
//    this.board[square] = value
//   }

//   clearSquare(square){
//     this.board[square] = 0
//   }

//   isSquareEmpty(square){
//     return this.board[square] === 0
//   }

//   generateMoves(){
//     return
//   }

//   displayBoard() {
//     for (let rank = 0; rank <= 7; rank++) {
//       let row = "";
//       for (let file = 0; file < 8; file++) {
//         const index = rank * 8 + file;
//         row += this.board[index] + " ";
//       }
//       console.log(row);
//     }
//   }
// }

// const populateBoard = (board, indexes, val) => {
//   indexes.forEach((el) => {
//     board.setSquare(el, val)
//   })
// }

// export const myBoard = new Board();
// populateBoard(myBoard, [8,9,10,11,12,13,14,15], -1);
// populateBoard(myBoard, [0,7], -2);
// populateBoard(myBoard, [1,6], -3);
// populateBoard(myBoard, [2,5], -4);
// populateBoard(myBoard, [3], -5);
// populateBoard(myBoard, [4], -6);

// populateBoard(myBoard, [48,49,50,51,52,53,54,55], 1);
// populateBoard(myBoard, [56, 63], 2);
// populateBoard(myBoard, [57,62], 3);
// populateBoard(myBoard, [58,61], 4);
// populateBoard(myBoard, [59], 5);
// populateBoard(myBoard, [60], 6);

// myBoard.displayBoard();

const initialPostion = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

const convertToBoard = (fen) => {
  const result = [];
  const rows = fen.split('/');
  rows.forEach((row) => {
    let temp = [];
    row.split(' ').forEach((char) =>{
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


let board = convertToBoard(initialPostion);
console.log(convertToFen(board))




