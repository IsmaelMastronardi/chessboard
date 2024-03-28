const { calculatePosibleMoves } = require("../../generateMoves");

describe('return all posible, legal moves with a single check', () => {
  describe('black attacking', () => {
    describe('should be able to block, take or move', () => {
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
            '77': [[ 6, 7 ], [ 7, 6 ]],
            '16': [[6, 6], [1, 1]]
          }
        },
        {
          board:
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', 'q', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', 'B', '0'],
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
            '26': [[4, 4]],
            '77': [[ 6, 7 ], [ 7, 6 ]]
          }
        },
        {
          board:
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', 'q', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', 'N', '0', '0', '0', '0'],
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
            '23': [[4, 4], [1, 1]],
            '77': [[ 6, 7 ], [ 7, 6 ]]
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
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', 'Q', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'K']
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
            '61': [[1, 1], [6, 6]],
            '77': [[ 6, 7 ], [ 7, 6 ]]
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
              ['0', '0', '0', '0', 'P', '0', '0', '0'],
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
            '54': [[4, 4]],
            '77': [[ 6, 7 ], [ 7, 6 ]]
          }
        },
        {
          board:
          {
            pieces: [
              ['k', '0', '0', 'N', '0', '0', '0', '0'],
              ['0', 'q', '0', '0', '0', 'B', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', 'P', '0', '0', '0'],
              ['0', '0', 'Q', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'K']
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
            '03': [[2, 2], [1, 1]],
            '15': [[3, 3]],
            '54': [[4,4]],
            '62': [[2, 2], [6, 6], [4, 4]],
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
    describe('should be only able to move', () => {
      const pinTests = [
        {
          board:
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', 'q', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'P'],
              ['0', '0', '0', '0', '0', '0', '0', 'K'],
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
            '77': [[ 7, 6 ]],
          }
        },
        {
          board:
          {
            pieces: [
              ['q', '0', '0', '0', 'r', '0', 'k', '0'],
              ['0', 'r', 'p', 'p', 'b', 'p', 'p', 'p'],
              ['0', '0', '0', '0', 'b', 'n', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['P', '0', '0', '0', '0', '0', '0', '0'],
              ['P', '0', 'P', 'P', 'P', 'P', 'P', 'P'],
              ['0', 'K', 'R', '0', '0', 'B', 'N', '0'],
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
            '71': [[ 7, 0 ]],
          }
        },
        {
          board:
          {
            pieces: [
              ['0', '0', 'r', '0', 'q', '0', '0', 'k'],
              ['0', '0', '0', '0', '0', 'n', 'p', 'p'],
              ['n', '0', '0', '0', '0', 'p', '0', '0'],
              ['0', 'b', '0', '0', 'p', '0', '0', '0'],
              ['p', '0', '0', '0', 'P', '0', '0', '0'],
              ['P', 'K', '0', '0', '0', 'P', '0', '0'],
              ['0', 'P', 'P', 'P', '0', '0', 'P', 'P'],
              ['0', '0', '0', 'B', 'N', '0', '0', 'R'],
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
              '51': [[ 6, 0]],
            }
        },
        {
          board:
          {
            pieces: [
              ['0', '0', '0', '0', '0', 'q', '0', 'k'],
              ['0', '0', '0', '0', '0', '0', 'p', 'p'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', 'R', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', 'n', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', 'N', 'P', 'P', 'K', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
              '66': [[7, 6], [7, 7], [6, 7], [5, 6], [5, 5], [7, 5] ],
            }
        },
      ];
      pinTests.forEach(({board, expectedMoves}) => {
        test('in different positions', () => {
          expect(calculatePosibleMoves(board, 'white')).toEqual(expectedMoves);
        });
      });
    });
    describe('should be only able to block', () => {
      const pinTests = [
        {
          board:
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', 'b', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', 'p', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', 'P', 'P', 'K'],
              ['r', '0', '0', '0', '0', '0', '0', '0'],
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
              '65': [[4, 5]],
              '66': [[ 5, 6 ]],
          }
        },
        {
          board:
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', 'b', 'b', '0', '0', '0', '0', '0'],
              ['0', 'q', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', 'p', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', 'N', '0', '0', 'K'],
              ['r', '0', '0', '0', '0', '0', '0', '0'],
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
              '64': [[4, 5], [5, 6]],
          }
        },
      ];
      pinTests.forEach(({board, expectedMoves}) => {
        test('in different positions', () => {
          expect(calculatePosibleMoves(board, 'white')).toEqual(expectedMoves);
        });
      });
    });
    describe('should be only able to take', () => {
      const pinTests = [
        {
          board:
          {
            pieces: [
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', 'q', '0', '0', '0'],
              ['0', '0', '0', 'K', '0', '0', '0', '0'],
              ['r', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', 'r', '0', '0', '0', '0', '0'],
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
              '43': [[3, 4]],
          }
        },
        {
          board:
          {
            pieces: [
              ['0', '0', 'q', '0', '0', '0', '0', 'k'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'b'],
              ['0', '0', '0', 'r', '0', '0', '0', '0'],
              ['0', '0', '0', 'K', 'P', '0', '0', '0'],
              ['P', 'P', 'P', '0', '0', 'P', 'P', 'P'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
              '53': [[4, 3]],
              '54': [[4, 3]],
          }
        },
      ];
      pinTests.forEach(({board, expectedMoves}) => {
        test('in different positions', () => {
          expect(calculatePosibleMoves(board, 'white')).toEqual(expectedMoves);
        });
      });
    });
    describe('should be checkmate', () => {
      const pinTests = [
        {
          board:
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', 'q', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'B'],
              ['0', '0', '0', '0', '0', '0', 'B', 'K'],
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: 'checkmate'
        },
        {
          board:
          {
            pieces: [
              ['q', '0', '0', '0', 'r', '0', 'k', '0'],
              ['0', 'r', 'p', 'p', '0', 'p', 'p', 'p'],
              ['0', '0', '0', '0', 'b', 'n', '0', '0'],
              ['0', '0', '0', '0', 'b', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['P', '0', '0', '0', '0', '0', '0', '0'],
              ['P', '0', 'P', 'P', 'P', 'P', 'P', 'P'],
              ['0', 'K', 'R', '0', '0', 'B', 'N', '0'],
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: 'checkmate'
        },
      ];
      pinTests.forEach(({board, expectedMoves}) => {
        test('in different positions', () => {
          expect(calculatePosibleMoves(board, 'white')).toEqual(expectedMoves);
        });
      });
    });
  });
  describe('white attacking', () => {
    describe('should be able to block or move', () => {
      const pinTests = [
        {
          board:
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', 'r', '0', '0', '0', '0', 'Q', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'K']
            ],
            turn: 'b',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
            '00': [[1, 0], [0, 1]],
            '61': [[ 1, 1 ], [ 6, 6 ]]
          }
        },
        {
          board:
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', 'B', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', 'b', '0', '0', '0', '0', '0', '0'],
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
            '00': [[1, 0], [0, 1]],
            '51': [[ 3, 3 ]]
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
              ['0', '0', '0', '0', '0', 'n', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', 'Q', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'K']
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
            '00': [[1, 0], [0, 1]],
            '45': [[ 6, 6 ], [3, 3 ]]
          }
        },
        {
          board:
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', 'q', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
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
            '00': [[1, 0], [0, 1]],
            '16': [[ 6, 6 ], [1, 1 ]]
          }
        },
        {
          board:
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', 'p', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
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
            '00': [[1, 0], [0, 1]],
            '12': [[ 2, 2 ]]
          }
        },
        {
          board:
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', 'q', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', 'p', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', 'b', '0', '0', '0', 'Q', '0'],
              ['0', '0', '0', '0', 'n', '0', '0', 'K']
            ],
            turn: 'b',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
            '00': [[1, 0], [0, 1]],
            '15': [[5, 5], [1, 1], [3, 3]],
            '34': [[4, 4]],
            '62': [[4, 4]],
            '74': [[5, 5], [6, 6]]
          }
        },
      ];
      pinTests.forEach(({board, expectedMoves}) => {
        test('in different positions', () => {
          expect(calculatePosibleMoves(board, 'black')).toEqual(expectedMoves);
        });
      });
    });
    describe('should be only able to move', () => {
      const pinTests = [
        {
          board:
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['p', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', 'Q', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'K'],
            ],
            turn: 'b',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
            '00': [[ 0, 1 ]],
          }
        },
        {
          board:
          {
            pieces: [
              ['0', 'r', '0', 'n', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', 'k', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'p'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', 'B', '0', '0', '0', '0', '0', '0'],
              ['P', 'B', 'P', 'P', 'P', 'N', '0', '0'],
              ['0', 'K', '0', '0', '0', '0', '0', 'Q'],
            ],
            turn: 'b',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
            '16': [[2, 6], [1, 7], [0, 5]],
          }
        },
        {
          board:
          {
            pieces: [
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', 'k', '0'],
              ['0', '0', '0', '0', '0', 'P', '0', '0'],
              ['0', '0', '0', '0', '0', 'K', 'P', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'P'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
            ],
            turn: 'b',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
              '26': [[2, 7], [1, 7], [1, 6], [1, 5], [2, 5]],
            }
        },
        {
          board:
          {
            pieces: [
              ['0', 'n', '0', '0', '0', 'r', '0', '0'],
              ['p', 'p', 'p', '0', '0', 'p', 'b', 'p'],
              ['0', '0', '0', '0', 'p', '0', 'p', '0'],
              ['0', '0', '0', 'k', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['B', 'P', 'R', 'P', 'R', 'P', 'P', 'P'],
              ['0', '0', '0', '0', '0', '0', '0', 'K'],
            ],
            turn: 'b',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
              '33': [[ 4, 3], [2, 3]],
            }
        },
      ];
      pinTests.forEach(({board, expectedMoves}) => {
        test('in different positions', () => {
          expect(calculatePosibleMoves(board, 'black')).toEqual(expectedMoves);
        });
      });
    });
    describe('should be only able to block', () => {
      const pinTests = [
        {
          board:
          {
            pieces: [
              ['R', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', 'p', 'p', 'k'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', 'P', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', 'B', '0', '0', '0', '0', '0'],
              ['K', '0', '0', '0', '0', '0', '0', '0'],
            ],
            turn: 'b',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
              '15': [[3, 5]],
              '16': [[ 2, 6 ]],
          }
        },
        {
          board:
          {
            pieces: [
              ['R', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', 'n', '0', '0', 'k'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', 'P', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', 'Q', '0', '0', '0', '0', '0', '0'],
              ['0', 'B', 'B', '0', '0', '0', '0', '0'],
              ['K', '0', '0', '0', '0', '0', '0', '0'],
            ],
            turn: 'b',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
              '14': [[3, 5], [2, 6]],
          }
        },
      ];
      pinTests.forEach(({board, expectedMoves}) => {
        test('in different positions', () => {
          expect(calculatePosibleMoves(board, 'black')).toEqual(expectedMoves);
        });
      });
    });
    describe('should be only able to take', () => {
      const pinTests = [
        {
          board:
          {
            pieces: [
              ['0', '0', 'R', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['R', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', 'k', '0', '0', '0', '0'],
              ['0', '0', '0', '0', 'Q', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
            ],
            turn: 'b',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
              '33': [[4, 4]],
          }
        },
        {
          board:
          {
            pieces: [
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['p', 'p', 'p', '0', '0', 'p', 'p', 'p'],
              ['0', '0', '0', 'k', 'p', '0', '0', '0'],
              ['0', '0', '0', 'R', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', 'B'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', 'Q', '0', '0', '0', '0', 'K'],
            ],
            turn: 'b',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
              '23': [[3, 3]],
              '24': [[3, 3]],
          }
        },
      ];
      pinTests.forEach(({board, expectedMoves}) => {
        test('in different positions', () => {
          expect(calculatePosibleMoves(board, 'black')).toEqual(expectedMoves);
        });
      });
    });
    describe('should be checkmate', () => {
      const pinTests = [
        {
          board:
          {
            pieces: [
              ['0', 'n', '0', '0', '0', 'r', '0', '0'],
              ['p', 'p', 'p', '0', '0', 'p', 'b', 'p'],
              ['0', '0', '0', 'p', 'p', '0', 'p', '0'],
              ['0', '0', '0', 'k', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', 'N', '0', '0'],
              ['B', 'P', 'R', 'P', 'R', 'P', 'P', 'P'],
              ['0', '0', '0', '0', '0', '0', '0', 'K'],
            ],
            turn: 'w',
            castling: '',
            enPassant: '-',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: 'checkmate'
        },
      ];
      pinTests.forEach(({board, expectedMoves}) => {
        test('in different positions', () => {
          expect(calculatePosibleMoves(board, 'black')).toEqual(expectedMoves);
        });
      });
    });
  });
  describe('special moves', () => {
    describe('should be able to En Passant', () => {
      const pinTests = [
        {
          board:
          {
            pieces: [
              ['k', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', 'p', 'P', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['0', '0', '0', '0', '0', '0', '0', '0'],
              ['K', '0', '0', '0', '0', '0', '0', '0'],
            ],
            turn: 'w',
            castling: '',
            enPassant: '21',
            halfMove: '0',
            fullMove: '1'
          },
            expectedMoves: {
              '32': [[2, 1], [2, 2]],
              '70': [[7, 1], [6, 1], [6, 0]],
            }
        },
      ];
      pinTests.forEach(({board, expectedMoves}) => {
        test('in different positions', () => {
          expect(calculatePosibleMoves(board, 'white')).toEqual(expectedMoves);
        });
      });
    });
  })
});