import { createSlice } from "@reduxjs/toolkit";
import { calculatePosibleMoves } from "../../gameLogic/generateMoves";
import { convertToBoard, convertToFen } from "../../gameLogic/helpers";
import { finalizeMove } from "../../gameLogic/completeMove";

export const movePiece = (pieceIndex, newIndex) => (dispatch) => {
  dispatch(gameBoardSlice.actions.updateBoard({pieceIndex, newIndex}));
};

export const selectPiece = (index) => (dispatch) => {
  dispatch(gameBoardSlice.actions.updateSelectedPiece(index));
};
export const getPosibleMoves = (board, color) => (dispatch) => {
  const allyColor = color === 'w' ? 'white' : 'black';
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
      state.selectedPiece = '';
      state.convertedBoard = finalizeMove(state.convertedBoard, action.payload.pieceIndex, action.payload.newIndex);
      state.fenBoard = convertToFen(state.convertedBoard);
      const moves = calculatePosibleMoves(state.convertedBoard, state.convertedBoard.turn === 'w' ? 'white' : 'black');
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

