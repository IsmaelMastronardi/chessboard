const { calculatePosibleMoves } = require("../../generateMoves");

describe('return all posible, legal moves with 2 or more checks', () => {
  describe('black attacking', () => {
    const pinTests = [
      {
        board:
        {
          pieces: [
            ['k', '0', '0', '0', '0', '0', '0', '0'],
            ['0', 'q', '0', '0', '0', '0', '0', 'r'],
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
            '77': [{move: [7, 6]}]
        }
      },
      {
        board:
        {
          pieces: [
            ['k', '0', '0', '0', '0', '0', '0', '0'],
            ['0', 'b', '0', '0', '0', '0', '0', 'r'],
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
            '77': [{move: [7, 6]}]
        }
      },
      {
        board:
        {
          pieces: [
            ['k', '0', '0', '0', '0', '0', '0', '0'],
            ['0', 'q', '0', '0', '0', '0', '0', 'b'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', 'K', '0', '0', '0'],
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
          '44': [
            {move: [5, 4]},
            {move: [4, 5]},
            {move: [3, 4]},
            {move: [4, 3]}
          ]
        }
      },
    ]
    pinTests.forEach(({board, expectedMoves}) => {
      test('in different positions', () => {
        expect(calculatePosibleMoves(board, 'white')).toEqual(expectedMoves);
      });
    });
  });
  describe('black attacking, should result in checkmate', () => {
    const pinTests = [
      {
        board:
        {
          pieces: [
            ['k', '0', '0', '0', '0', '0', '0', '0'],
            ['0', 'q', '0', '0', '0', 'n', '0', 'b'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', 'r', '0', '0', 'K', '0', '0', '0'],
            ['0', 'r', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0']
          ],
          turn: 'w',
          castling: '',
          enPassant: '-',
          halfMove: '0',
          fullMove: '1'
        },
          expectedMoves: 'checkmate'
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
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['R', '0', '0', '0', '0', '0', 'Q', '0'],
            ['0', '0', '0', '0', '0', '0', '0', 'K']
          ],
          turn: 'b',
          castling: '',
          enPassant: '-',
          halfMove: '0',
          fullMove: '1'
        },
          expectedMoves: {
            '00': [{move: [0, 1]}]
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
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['R', '0', '0', '0', '0', '0', 'B', '0'],
            ['0', '0', '0', '0', '0', '0', '0', 'K']
          ],
          turn: 'b',
          castling: '',
          enPassant: '-',
          halfMove: '0',
          fullMove: '1'
        },
          expectedMoves: {
            '00': [{move: [0, 1]}]
        }
      },
      {
        board:
        {
          pieces: [
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', 'k', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['Q', '0', '0', '0', '0', '0', 'B', '0'],
            ['0', '0', '0', '0', '0', '0', '0', 'K']
          ],
          turn: 'b',
          castling: '',
          enPassant: '-',
          halfMove: '0',
          fullMove: '1'
        },
        expectedMoves: {
          '33': [
            {move: [4, 3]},
            {move: [3, 4]},
            {move: [2, 3]},
            {move: [3, 2]}
          ]
        }
      },
    ]
    pinTests.forEach(({board, expectedMoves}) => {
      test('in different positions', () => {
        expect(calculatePosibleMoves(board, 'black')).toEqual(expectedMoves);
      });
    });
  });
  describe('white attacking, should result in checkmate', () => {
    const pinTests = [
      {
        board:
        {
          pieces: [
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', 'R'],
            ['0', '0', '0', 'k', '0', '0', '0', 'R'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['Q', '0', '0', '0', 'N', '0', 'B', '0'],
            ['0', '0', '0', '0', '0', '0', '0', 'K']
          ],
          turn: 'b',
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
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', 'Q'],
            ['0', '0', '0', 'k', '0', '0', '0', 'Q'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['B', '0', '0', '0', 'N', '0', 'B', '0'],
            ['0', '0', '0', '0', '0', '0', '0', 'K']
          ],
          turn: 'b',
          castling: '',
          enPassant: '-',
          halfMove: '0',
          fullMove: '1'
        },
          expectedMoves: 'checkmate'
      },
    ]
    pinTests.forEach(({board, expectedMoves}) => {
      test('in different positions', () => {
        expect(calculatePosibleMoves(board, 'black')).toEqual(expectedMoves);
      });
    });
  });
});