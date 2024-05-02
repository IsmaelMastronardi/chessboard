import { createSlice } from "@reduxjs/toolkit";
import { calculatePosibleMoves } from "../../gameLogic/generateMoves";
const { convertToBoard, convertToFen } = require("../../gameLogic/helpers");

const initalBoardPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const changeBoardValue = (arr, row, col, value) => {
  const newArr = [...arr];
  newArr[row][col] = value;
  return newArr;
};

const initialState = {
  editorFenBoard: initalBoardPosition,
  editorConvertedBoard: convertToBoard(initalBoardPosition),
  chosenAction: '',
  boardIsPlayable: true,
};

const boardEditorSlice = createSlice({
  name: 'boardEditor',
  initialState,
  reducers: {
    setToInitialPosition: (state) => {
      state.editorConvertedBoard = convertToBoard(initalBoardPosition);
      state.boardIsPlayable = true;
    },
    checkBoardPlayability: (state) => {
      const moves = calculatePosibleMoves(state.editorConvertedBoard, state.editorConvertedBoard.turn === 'w' ? 'white' : 'black');
      console.log('moves', moves)
      state.boardIsPlayable = moves !== 'checkmate' && moves !== 'stalemate' && moves !== 'no king found';
    },
    clearBoard: (state) => {
      state.editorConvertedBoard.pieces = Array(8).fill(null).map(() => Array(8).fill('0'));
      boardEditorSlice.caseReducers.checkBoardPlayability(state);
    },
    updateEditorBoard: (state, action) => {
      state.editorConvertedBoard.pieces = changeBoardValue(state.editorConvertedBoard.pieces, action.payload.row, action.payload.col, action.payload.value);
      boardEditorSlice.caseReducers.checkBoardPlayability(state);
    },
    updateChosenAction: (state, action) => {
      console.log(action.payload);
      state.chosenAction = action.payload;
      boardEditorSlice.caseReducers.checkBoardPlayability(state);
    },
    updateCastling: (state, action) => {
      state.editorConvertedBoard.castling = action.payload;
      boardEditorSlice.caseReducers.checkBoardPlayability(state);
    },
  }
});

export const { checkBoardPlayability, clearBoard, setToInitialPosition, updateEditorBoard, updateChosenAction, updateCastling } = boardEditorSlice.actions;
export default boardEditorSlice.reducer;