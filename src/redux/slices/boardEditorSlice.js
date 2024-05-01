import { createSlice } from "@reduxjs/toolkit";
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
};

const boardEditorSlice = createSlice({
  name: 'boardEditor',
  initialState,
  reducers: {
    clearBoard: (state) => {
      state.editorConvertedBoard.pieces = Array(8).fill(null).map(() => Array(8).fill('0'));
    },
    initialPosition: (state) => {
      state.editorConvertedBoard = convertToBoard(initalBoardPosition);
    },
    updateEditorBoard: (state, action) => {
      state.editorConvertedBoard.pieces = changeBoardValue(state.editorConvertedBoard.pieces, action.payload.row, action.payload.col, action.payload.value);
      
    },
    updateChosenAction: (state, action) => {
      console.log(action.payload);
      state.chosenAction = action.payload;
    },
    updateCastling: (state, action) => {
      state.editorConvertedBoard.castling = action.payload;
    },
  }
});

export const { clearBoard, initialPosition, updateEditorBoard, updateChosenAction, updateCastling } = boardEditorSlice.actions;
export default boardEditorSlice.reducer;