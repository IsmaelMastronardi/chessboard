import { configureStore } from "@reduxjs/toolkit";
import gameBoardSliceReducer from "./slices/boardSlice";

const store  = configureStore({
  reducer: {
    gameBoard: gameBoardSliceReducer,
  }
});

export default store;
