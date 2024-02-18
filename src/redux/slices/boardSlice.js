import { createSlice } from "@reduxjs/toolkit";
import { myBoard } from "../../chessBoard";



export const movePiece = (oldPos, newPost) => (dispatch) => {
  console.log('moving piece')
  dispatch(boardSlice.actions.updateBoard(oldPos, newPost));
};

const initialState = {
  board: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
  posibleMoves: null,
  loading: false,
  error: null,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    updateBoard: {
      reducer: (state, action) => {
        console.log(action.payload)
      }
    }
  },
});

export default boardSlice.reducer;

