const {
  convertToBoard,
  convertToFen,
  getPieceColor,
  moveVertical,
  moveHorizontal,
  moveDiagonal,
  generatePawnMoves,
} = require('./chessBoard');

describe('chessBoard', () => {
  describe('convertToBoard', () => {
    test('should convert FEN initial position to board', () => {
      const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
      const expectedBoard = 'rnbqkbnrpppppppp00000000000000000000000000000000PPPPPPPPRNBQKBNR';

      expect(convertToBoard(fen)).toEqual(expectedBoard);
    });
    test('should convert FEN italian position to board', () => {
      const fen = 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R';
      const expectedBoard = 'r0bqk0nrpppp0ppp00n0000000b0p00000B0P00000000N00PPPP0PPPRNBQK00R';

      expect(convertToBoard(fen)).toEqual(expectedBoard);
    });

  });

  describe('convertToFen', () => {
    test('should convert board initial position to FEN', () => {
      const board = 'rnbqkbnrpppppppp00000000000000000000000000000000PPPPPPPPRNBQKBNR';
      const expectedFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

      expect(convertToFen(board)).toEqual(expectedFen);
    });

    test('should convert board italian game to FEN', () => {
      const board = 'r0bqk0nrpppp0ppp00n0000000b0p00000B0P00000000N00PPPP0PPPRNBQK00R';
      const expectedFen = 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R';

      expect(convertToFen(board)).toEqual(expectedFen);
    });
  });

  describe('getPieceColor', () => {
    test('should return "black" for a black piece', () => {
      const piece = 'r';
      expect(getPieceColor(piece)).toBe('black');
    });

    test('should return "white" for a white piece', () => {
      const piece = 'R';
      expect(getPieceColor(piece)).toBe('white');
    });

    test('should return "none" for an empty square', () => {
      const piece = '0';
      expect(getPieceColor(piece)).toBe(null);
    });
  });

});
