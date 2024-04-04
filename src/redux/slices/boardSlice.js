import { createSlice } from "@reduxjs/toolkit";
import { calculatePosibleMoves } from "../../gameLogic/generateMoves";
import { convertToBoard, convertToFen } from "../../gameLogic/helpers";

export const movePiece = (pieceIndex, newIndex) => (dispatch) => {
  console.log('moving piece')
  dispatch(gameBoardSlice.actions.updateBoard({pieceIndex, newIndex}));
};

export const selectPiece = (index) => (dispatch) => {
  dispatch(gameBoardSlice.actions.updateSelectedPiece(index));
};
export const getPosibleMoves = (board, color) => (dispatch) => {
  const allyColor = color === 'w' ? 'white' : 'black';
  console.log(allyColor);
  console.log('aaaaaaaaa')
  const result = calculatePosibleMoves(board, allyColor);
  dispatch(gameBoardSlice.actions.updatePosibleMoves(result));
};

const initalBoardPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const initialState = {
  fenBoard: initalBoardPosition,
  convertedBoard: convertToBoard(initalBoardPosition),
  posibleMoves: calculatePosibleMoves(convertToBoard(initalBoardPosition), 'white'),
  selectedPiece: '',
};

const gameBoardSlice = createSlice({
  name: 'gameBoard',
  initialState,
  reducers: {
    updateBoard: (state, action) => {
      const oldIndex = action.payload.pieceIndex;
      const newIndex = action.payload.newIndex;
      const piece = state.convertedBoard.pieces[oldIndex[0]][oldIndex[1]];
      state.convertedBoard.pieces[oldIndex[0]][oldIndex[1]] = '0';
      state.convertedBoard.pieces[newIndex[0]][newIndex[1]] = piece;
      state.convertedBoard.turn === 'w' ? state.convertedBoard.turn = 'b' : state.convertedBoard.turn = 'w';
      state.selectedPiece = '';
      state.fenBoard = convertToFen(state.convertedBoard);
      const moves = calculatePosibleMoves(state.convertedBoard, state.convertedBoard.turn === 'w' ? 'white' : 'black');
      console.log(moves);
      state.posibleMoves = moves;
    },
    updateSelectedPiece: (state, action) => {
      state.selectedPiece = action.payload;
    },
    updatePosibleMoves: (state, action) => {
      state.posibleMoves = action.payload;
    },
  },
});

export default gameBoardSlice.reducer;

