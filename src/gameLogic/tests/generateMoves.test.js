const { calculatePosibleMoves } = require("../generateMoves");

describe('generate all posible, legal moves on one turn',() => {
  describe('with no checks nor pins', () => {
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
        '70': [],
        '71': [ [ 5, 2 ], [ 5, 0 ] ],
        '72': [],
        '73': [],
        '74': [],
        '75': [],
        '76': [ [ 5, 7 ], [ 5, 5 ] ],
        '77': []
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
        '00': [],
        '01': [ [ 2, 2 ], [ 2, 0 ] ],
        '02': [],
        '03': [],
        '04': [],
        '05': [],
        '06': [ [ 2, 7 ], [ 2, 5 ] ],
        '07': []
      }
      expect(calculatePosibleMoves(initialBoard, 'black')).toEqual(expectedMoves);
    });
  });
  describe('with a pin',() => {
    describe('black attacking', () => {
      const pinTests = [
        {
          board:
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', 'q', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', 'P', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'K']
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
           expectedMoves: {
            '66': [],
            '77': [ [ 6, 7 ], [ 7, 6 ] ]
          }
        },
        {
          board: 
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', 'q', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', 'N', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'K']
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
           expectedMoves: {
            '66': [],
            '77': [ [ 6, 7 ], [ 7, 6 ] ]
          }
        },
        {
          board: 
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', 'q', '0', '0', '0'],
              ['0', '0', '0', '0', '0', 'P', '0', '0'],
              ['0', '0', '0', '0', '0', '0', 'K', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0']
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
           expectedMoves: {
            '55': [[4, 4]],
            '66': [[ 7, 6 ], [ 7, 7 ], [ 6, 7 ], [ 5, 6 ], [ 6, 5 ], [ 7, 5 ], [ 5, 7 ]]
          }
        },
        {
          board: 
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', 'q', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', 'Q', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'K']
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
           expectedMoves: {
            '55': [[6, 6], [4, 4], [3, 3], [2, 2], [1, 1]],
            '77': [[6, 7], [ 6, 6 ], [ 7, 6 ] ]
          }
        },
        {
          board: 
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', 'q', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', 'B', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'K']
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
           expectedMoves: {
            '55': [[6, 6], [4, 4], [3, 3], [2, 2], [1, 1]],
            '77': [[6, 7], [ 6, 6 ], [ 7, 6 ] ]
          }
        },
        {
          board: 
          {
            pieces: [
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['k', 'q', '0', '0', '0', 'R', '0', 'K'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0']
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
           expectedMoves: {
            '15': [[1, 6], [1, 4], [1, 3], [1, 2], [1, 1]],
            '17': [[2, 7], [ 0, 7 ], [0, 6], [ 1, 6 ], [2, 6] ]
          }
        },
      ]
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
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', 'p', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', 'Q', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'K']
            ],
            turn: 'B',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
           expectedMoves: {
            '11': [],
            '00': [ [ 1, 0 ], [ 0, 1 ] ]
          }
        },
        {
          board: 
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', 'n', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', 'Q', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'K']
            ],
            turn: 'b',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
           expectedMoves: {
            '11': [],
            '00': [ [ 1, 0 ], [ 0, 1 ] ]
          }
        },
        {
          board: 
          {
            pieces: [
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', 'k', '0', '0', '0', '0', '0', '0'],
              ['0', '0', 'p', '0', '0', '0', '0', '0'],
              ['0', '0', '0', 'Q', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', 'K', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0']
            ],
            turn: 'b',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
           expectedMoves: {
            '11': [[2, 1], [1, 2], [0, 1], [0, 0], [1, 0] , [2, 0], [0, 2]],
            '22': [[3, 3]],
          }
        },
        {
          board: 
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', 'q', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', 'Q', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'K']
            ],
            turn: 'b',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
           expectedMoves: {
            '00': [[1, 0], [1, 1], [0, 1]],
            '22': [[1, 1], [3, 3], [4, 4], [5, 5], [6, 6]]
          }
        },
        {
          board: 
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', 'b', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', 'Q', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'K']
            ],
            turn: 'b',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
           expectedMoves: {
            '00': [[1, 0], [1, 1], [0, 1]],
            '22': [[1, 1], [3, 3], [4, 4], [5, 5], [6, 6]]
          }
        },
        {
          board: 
          {
            pieces: [
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['k', '0', 'r', '0', '0', '0', 'Q', 'K'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0']
            ],
            turn: 'b',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
           expectedMoves: {
            '10': [[2, 0], [2, 1], [1, 1], [0, 0], [0, 1]],
            '12': [[1, 1], [1, 3], [1, 4], [1, 5], [1, 6]]
          }
        },
      ]
      pinTests.forEach(({board, expectedMoves}) => {
        test('in different positions', () => {
          expect(calculatePosibleMoves(board, 'black')).toEqual(expectedMoves);
        });
      });
    });
  });
  describe('with 1 check', () => {
    describe('black attacking', () => {
      describe('should be able to block or move', () => {
        const pinTests = [
          {
            board:
            {
              pieces: [
                ['k', '0', '0', '0', '0', '0', '0', '0'],
                ['0', 'q', '0', '0', '0', '0', 'R', '0'],
                ['0', '0', '0', '0', '0', '0', '0', '0'],
                ['0', '0', '0', '0', '0', '0', '0', '0'],
                ['0', '0', '0', '0', '0', '0', '0', '0'],
                ['0', '0', '0', '0', '0', '0', '0', '0'],
                ['0', '0', '0', '0', '0', '0', '0', '0'],
                ['0', '0', '0', '0', '0', '0', '0', 'K']
              ],
              turn: 'w',
              castling: '',
              enPassant: '-',
              halfMove: '0',
              fullMove: '1'
            },
             expectedMoves: {
              '16': [[6, 6], [1, 1]],
              '77': [[ 6, 7 ], [ 7, 6 ]]
            }
          },
        ];
        pinTests.forEach(({board, expectedMoves}) => {
          test('in different positions', () => {
            expect(calculatePosibleMoves(board, 'white')).toEqual(expectedMoves);
          });
        });
      });
    });
  });
})
