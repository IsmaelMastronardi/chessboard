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
    updateEditorBoard: (state, action) => {
      console.log('here')
      state.editorConvertedBoard.pieces = changeBoardValue(state.editorConvertedBoard.pieces, action.payload.row, action.payload.col, action.payload.value);
    },
    updateChosenAction: (state, action) => {
      console.log(action.payload);
      state.chosenAction = action.payload;
    },
  }
});

export const { updateEditorBoard, updateChosenAction } = boardEditorSlice.actions;
export default boardEditorSlice.reducer;