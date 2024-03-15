import { moveVertical } from "../../chessBoard";

describe('moveVertical in initial the position', () => {
  const board = 'rnbqkbnrpppppppp00000000000000000000000000000000PPPPPPPPRNBQKBNR';
  describe('black pieces', () => {
    test('should return the piece at [8] vertical moves, independent of the piece', () => {
      const position = 8;
      const expectedMoves = [ 16, 24, 32, 40, 48 ];
      expect(moveVertical(board, position)).toEqual(expectedMoves);
    });
    test('should return the piece at [9] vertical moves, independent of the piece', () => {
      const position = 9;
      const expectedMoves = [ 17, 25, 33, 41, 49 ];
      expect(moveVertical(board, position)).toEqual(expectedMoves);
    });
    test('should return the piece at [14] vertical moves, independent of the piece', () => {
      const position = 14;
      const expectedMoves = [ 22, 30, 38, 46, 54 ];
      expect(moveVertical(board, position)).toEqual(expectedMoves);
    });
    test('should return the piece at [15] vertical moves, independent of the piece', () => {
      const position = 15;
      const expectedMoves = [ 23, 31, 39, 47, 55 ];
      expect(moveVertical(board, position)).toEqual(expectedMoves);
    });
    test('should return the piece at [0] vertical moves, independent of the piece', () => {
      const position = 0;
      const expectedMoves = [];
      expect(moveVertical(board, position)).toEqual(expectedMoves);
    });
  });
  describe('white pieces', () => {
    test('should return the piece at [48] vertical moves, independent of the piece', () => {
      const position = 48;
      const expectedMoves = [ 40, 32, 24, 16, 8];
      expect(moveVertical(board, position)).toEqual(expectedMoves);
    });
    test('should return the piece at [49] vertical moves, independent of the piece', () => {
      const position = 49;
      const expectedMoves = [ 41, 33, 25, 17, 9 ];
      expect(moveVertical(board, position)).toEqual(expectedMoves);
    });
    test('should return the piece at [54] vertical moves, independent of the piece', () => {
      const position = 54;
      const expectedMoves = [ 46, 38, 30, 22, 14];
      expect(moveVertical(board, position)).toEqual(expectedMoves);
    });
    test('should return the piece at [55] vertical moves, independent of the piece', () => {
      const position = 55;
      const expectedMoves = [ 47, 39, 31, 23, 15 ];
      expect(moveVertical(board, position)).toEqual(expectedMoves);
    });
    test('should return the piece at [63] vertical moves, independent of the piece', () => {
      const position = 63;
      const expectedMoves = [];
      expect(moveVertical(board, position)).toEqual(expectedMoves);
    });
  });
});

describe('moveVertical in board with only rooks, queens and kings', () => {
  const board = '000r0q0k000000000000000000000000000000000000000000000000K0R0Q000';
  describe('black pieces', () => {
    test('should return the piece at [3] vertical moves, independent of the piece', () => {
      const position = 3;
      const expectedMoves = [ 11, 19, 27, 35, 43, 51, 59 ];
      expect(moveVertical(board, position)).toEqual(expectedMoves);
    });
    test('should return the piece at [5] vertical moves, independent of the piece', () => {
      const position = 5;
      const expectedMoves = [ 13, 21, 29, 37, 45, 53, 61 ];
      expect(moveVertical(board, position)).toEqual(expectedMoves);
    });
  });
  describe('white pieces', () => {
    test('should return the piece at [58] vertical moves, independent of the piece', () => {
      const position = 58;
      const expectedMoves = [ 50, 42, 34, 26, 18, 10, 2 ];
      expect(moveVertical(board, position)).toEqual(expectedMoves);
    });
    test('should return the piece at [60] vertical moves, independent of the piece', () => {
      const position = 60;
      const expectedMoves = [ 52, 44, 36, 28, 20, 12, 4 ];
      expect(moveVertical(board, position)).toEqual(expectedMoves);
    });
  });
});