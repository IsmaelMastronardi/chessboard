const finalizeMove = (board, oldIndex, newIndex) => {
  const movingPiece = board.pieces[oldIndex[0]][oldIndex[1]];
  const newSquare = board.pieces[oldIndex[0][oldIndex[1]]]
  const previousSquare = board.pieces[oldIndex[0]][oldIndex[1]];
  const currentPlayer = board.turn;
  const castlingToRemove = new Set();


  board.pieces[oldIndex[0]][oldIndex[1]] = '0';
  board.pieces[newIndex[0]][newIndex[1]] = movingPiece;

  if(currentPlayer === 'w'){
    board.turn = 'b';
    board.fullMove = Number(board.fullMove) + 1;
    board.halfMove = Number(board.halfMove) + 1;

    // Handle losing own casteling rights for moving pieces
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


    // Handle opponent lossing casteling rights 
    if(newIndex[0] === 7){
      if(newIndex[1] === 0){
        castlingToRemove.add('q');
      }
      if(newIndex[1] === 7){
        castlingToRemove.add('k');
      }
    }

    // Add En Passant if you moved the pawn 2 squares
    if(movingPiece === 'P'){

      if(oldIndex[0] - 2 === newIndex[0]){
        board.enPassant = `${oldIndex[0] - 1}${oldIndex[1]}`;
      }
    }

    // If you castled move the rook to the side of the king
    console.log(Math.abs(oldIndex[1] - newIndex[1]) === 2)
    if(movingPiece === 'K' && (Math.abs(oldIndex[1] - newIndex[1]) === 2)){
      console.log('castrling')
      if(newIndex[1] === 6){
        board.pieces[7][7] = '0';
        board.pieces[7][5] = 'R'
      }
      if(newIndex[1] === 2){
        board.pieces[7][0] = '0';
        board.pieces[7][3] = 'R'
      }
    }
  }
  else {
    board.turn = 'w';
    board.halfMove = Number(board.halfMove) + 1;

    // Handle losing own casteling rights for moving pieces
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

    // Handle opponent lossing casteling rights 
    if(newIndex[0] === 0){
      if(newIndex[1] === 0){
        castlingToRemove.add('Q');
      }
      if(newIndex[1] === 7){
        castlingToRemove.add('K');
      }
    }

    // Add En Passant if you moved the pawn 2 squares
    if(movingPiece === 'p'){
      if(oldIndex[0] + 2 === newIndex[0]){
        board.enPassant = `${oldIndex[0] + 1}${oldIndex[1]}`;
      }
    }

    // If you castled move the rook to the side of the king
    if(movingPiece === 'k' && (Math.abs(oldIndex[1] - newIndex[1]) === 2)){
      if(newIndex[1] === 6){
        board.pieces[0][7] = '0';
        board.pieces[0][5] = 'R'
      }
      if(newIndex[1] === 2){
        board.pieces[0][0] = '0';
        board.pieces[0][3] = 'R'
      }
    }
  }

  castlingToRemove.forEach(right => {
    board.castling.replace(new RegExp(right, 'g'), '');
});

  // If you take En Passant, remove the taken pawn
  if((movingPiece === 'P' || movingPiece === 'p') && newIndex[0] === Number(board.enPassant[0]) && newIndex[1] === Number(board.enPassant[1])){
    if(board.enPassant[0] === '5'){
      board.pieces[4][board.enPassant[1]] = '0';
    }
    if(board.enPassant[0] === '2'){
      board.pieces[3][board.enPassant[1]] = '0';
    }
    
    board.enPassant = '-';
  }

  return board;
}

module.exports = {
  finalizeMove,
}