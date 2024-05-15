const { calculatePosibleMoves } = require("../../generateMoves");

describe('return all posible, legal moves with no checks nor pins', () => {
  test('In the initial position', () => {
    const initialBoard = 
    {
      pieces: [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
      ],
      turn: 'w',
      castling: 'KQkq',
      enPassant: '-',
      halfMove: '0',
      fullMove: '1'
    };
    const expectedMoves = {
      '60': [ {move: [ 5, 0 ]}, {move: [ 4, 0 ]} ],
      '61': [ {move: [ 5, 1 ]}, {move: [ 4, 1 ]} ],
      '62': [ {move: [ 5, 2 ]}, {move: [ 4, 2 ]} ],
      '63': [ {move: [ 5, 3 ]}, {move: [ 4, 3 ]} ],
      '64': [ {move: [ 5, 4 ]}, {move: [ 4, 4 ]} ],
      '65': [ {move: [ 5, 5 ]}, {move: [ 4, 5 ]} ],
      '66': [ {move: [ 5, 6 ]}, {move: [ 4, 6 ]} ],
      '67': [ {move: [ 5, 7 ]}, {move: [ 4, 7 ]} ],
      '71': [ {move: [ 5, 2 ]}, {move: [ 5, 0 ]} ],
      '76': [ {move: [ 5, 7 ]}, {move: [ 5, 5 ]} ],
    }
    expect(calculatePosibleMoves(initialBoard, 'white')).toEqual(expectedMoves);
  });
  test('after e4', () => {
    const initialBoard = 
    {
      pieces: [
        ['r', 'n', 'b', 'q', 'k', 'b','n', 'r'],
        ['p', 'p', 'p','p', 'p', 'p', 'p', 'p'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', 'P', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['P', 'P', 'P', 'P', '0', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
      ],
      turn: 'b',
      castling: 'KQkq',
      enPassant: '-',
      halfMove: '0',
      fullMove: '1'
    };
    const expectedMoves = {
      '10': [ {move: [ 2, 0 ]}, {move: [ 3, 0 ]} ],
      '11': [ {move: [ 2, 1 ]}, {move: [ 3, 1 ]} ],
      '12': [ {move: [ 2, 2 ]}, {move: [ 3, 2 ]} ],
      '13': [ {move: [ 2, 3 ]}, {move: [ 3, 3 ]} ],
      '14': [ {move: [ 2, 4 ]}, {move: [ 3, 4 ]} ],
      '15': [ {move: [ 2, 5 ]}, {move: [ 3, 5 ]} ],
      '16': [ {move: [ 2, 6 ]}, {move: [ 3, 6 ]} ],
      '17': [ {move: [ 2, 7 ]}, {move: [ 3, 7 ]} ],
      '01': [ {move: [ 2, 2 ]}, {move: [ 2, 0 ]} ],
      '06': [ {move: [ 2, 7 ]}, {move: [ 2, 5 ]} ],
    }
    expect(calculatePosibleMoves(initialBoard, 'black')).toEqual(expectedMoves);
  });
  describe('should result in stalemate', () => {
    describe('black attacking', () => {
      const pinTests = [
        {
          board:
          {
            pieces: [
              ['0', 'r', '0', 'r', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', 'b', '0', '0'],
              ['0', '0', '0', '0', 'N', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'q'],
              ['0', '0', 'K', '0', '0', '0', '0', '0'],
              ['p', '0', '0', '0', '0', '0', '0', 'q'],
              ['P', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: 'stalemate'
        },
      ];
      pinTests.forEach(({board, expectedMoves}) => {
        test('in different positions', () => {
          expect(calculatePosibleMoves(board, 'white')).toEqual(expectedMoves);
        });
      });
    });
    describe('white attacking', () => {
      const pinTests = [
        {
          board:
          {
            pieces: [
              ['0', 'R', '0', 'R', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', 'B', '0', '0'],
              ['0', '0', '0', '0', 'n', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'Q'],
              ['0', '0', 'k', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'Q'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
            ],
            turn: 'b',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: 'stalemate'
        },
      ];
      pinTests.forEach(({board, expectedMoves}) => {
        test('in different positions', () => {
          expect(calculatePosibleMoves(board, 'black')).toEqual(expectedMoves);
        });
      });
    });
  });
});

