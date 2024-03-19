const getPieceColor = (piece) => {
  if(piece === '0') return null;
  return piece === piece.toUpperCase() ? 'white' : 'black';
}

const kingSafetyCheck = (board, position) => {
  const splitBoard = board.split('');
  const king = splitBoard[position];
  const color = getPieceColor(king);
  const attackedSquares = [];
  const pinnedPieces = [];
  
};