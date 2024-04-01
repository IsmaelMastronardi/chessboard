const { calculatePosibleMoves } = require("../../generateMoves");

describe('return all posible, legal moves with no checks nor pins', () => {
  test('In the initial position', () => {
    const initialBoard = 
    {
      pieces: [
        ['r', 'n', 'b', 'q', 'k', 'b','n', 'r'],
        ['p', 'p', 'p','p', 'p', 'p', 'p', 'p'],
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
      '60': [ [ 5, 0 ], [ 4, 0 ] ],
      '61': [ [ 5, 1 ], [ 4, 1 ] ],
      '62': [ [ 5, 2 ], [ 4, 2 ] ],
      '63': [ [ 5, 3 ], [ 4, 3 ] ],
      '64': [ [ 5, 4 ], [ 4, 4 ] ],
      '65': [ [ 5, 5 ], [ 4, 5 ] ],
      '66': [ [ 5, 6 ], [ 4, 6 ] ],
      '67': [ [ 5, 7 ], [ 4, 7 ] ],
      '71': [ [ 5, 2 ], [ 5, 0 ] ],
      '76': [ [ 5, 7 ], [ 5, 5 ] ],
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
      '10': [ [ 2, 0 ], [ 3, 0 ] ],
      '11': [ [ 2, 1 ], [ 3, 1 ] ],
      '12': [ [ 2, 2 ], [ 3, 2 ] ],
      '13': [ [ 2, 3 ], [ 3, 3 ] ],
      '14': [ [ 2, 4 ], [ 3, 4 ] ],
      '15': [ [ 2, 5 ], [ 3, 5 ] ],
      '16': [ [ 2, 6 ], [ 3, 6 ] ],
      '17': [ [ 2, 7 ], [ 3, 7 ] ],
      '01': [ [ 2, 2 ], [ 2, 0 ] ],
      '06': [ [ 2, 7 ], [ 2, 5 ] ],
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
