import { createSlice } from "@reduxjs/toolkit";
import { calculatePosibleMoves } from "../../gameLogic/generateMoves";
import { convertToBoard } from "../../gameLogic/helpers";

export const movePiece = (oldPos, newPost) => (dispatch) => {
  console.log('moving piece')
  dispatch(gameBoardSlice.actions.updateBoard(oldPos, newPost));
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
  selectedPiece: '60',
};

const gameBoardSlice = createSlice({
  name: 'gameBoard',
  initialState,
  reducers: {
    updateBoard: {
      reducer: (state, action) => {
        console.log(action.payload)
      }
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

