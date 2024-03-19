const getPieceColor = (piece) => {
  return piece === piece.toLowerCase() ? 'black' : 'white';
}

function parseBoard(boardString) {
  const board = [];
  for (let i = 0; i < 8; i++) {
      const row = boardString.substr(i * 8, 8);
      board.push(row.split(''));
  }
  return board;
}

module.exports = {
  getPieceColor,
  parseBoard,
};