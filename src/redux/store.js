import { configureStore } from "@reduxjs/toolkit";
import boardSliceReducer from "./slices/boardSlice";

const store  = configureStore({
  reducer: {
    boardStore: boardSliceReducer,
  }
});

export default store;
