const finalizeMove = (board, oldIndex, move) => {
  const movingPiece = board.pieces[oldIndex[0]][oldIndex[1]];
  const previousSquare = board.pieces[oldIndex[0]][oldIndex[1]];
  const currentPlayer = board.turn;
  const castlingToRemove = new Set();

  board.pieces[oldIndex[0]][oldIndex[1]] = '0';
  board.pieces[move.move[0]][move.move[1]] = movingPiece;

  if(currentPlayer === 'w'){
    board.turn = 'b';
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
    if(move.move[0] === 7){
      if(move.move[1] === 0){
        castlingToRemove.add('q');
      }
      if(move.move[1] === 7){
        castlingToRemove.add('k');
      }
    }

    
    if(movingPiece === 'P'){
      //promote piece
      if(move.promotion){
        board.pieces[move.move[0]][move.move[1]] = move.promotionPiece;
      }
      // Add En Passant if you moved the pawn 2 squares
      if(oldIndex[0] - 2 === move.move[0]){
        board.enPassant = `${oldIndex[0] - 1}${oldIndex[1]}`;
      }
    }

    // If you castled move the rook to the side of the king
    if(movingPiece === 'K' && (Math.abs(oldIndex[1] - move.move[1]) === 2)){
      if(move.move[1] === 6){
        board.pieces[7][7] = '0';
        board.pieces[7][5] = 'R'
      }
      if(move.move[1] === 2){
        board.pieces[7][0] = '0';
        board.pieces[7][3] = 'R'
      }
    }
  }
  else {
    board.turn = 'w';
    board.fullMove = Number(board.fullMove) + 1;
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
    if(move.move[0] === 0){
      if(move.move[1] === 0){
        castlingToRemove.add('Q');
      }
      if(move.move[1] === 7){
        castlingToRemove.add('K');
      }
    }


    if(movingPiece === 'p'){
      //promote piece
      if(move.promotion){
        board.pieces[move.move[0]][move.move[1]] = move.promotionPiece;
      }
      // Add En Passant if you moved the pawn 2 squares
      if(oldIndex[0] + 2 === move.move[0]){
        board.enPassant = `${oldIndex[0] + 1}${oldIndex[1]}`;
      }
    }

    // If you castled move the rook to the side of the king
    if(movingPiece === 'k' && (Math.abs(oldIndex[1] - move.move[1]) === 2)){
      if(move.move[1] === 6){
        board.pieces[0][7] = '0';
        board.pieces[0][5] = 'r'
      }
      if(move.move[1] === 2){
        board.pieces[0][0] = '0';
        board.pieces[0][3] = 'r'
      }
    }
  }

  castlingToRemove.forEach(right => {
    board.castling.replace(new RegExp(right, 'g'), '');
});

  // If you take En Passant, remove the taken pawn
  if((movingPiece === 'P' || movingPiece === 'p') && move.move[0] === Number(board.enPassant[0]) && move.move[1] === Number(board.enPassant[1])){
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