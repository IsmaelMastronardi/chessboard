import { configureStore } from "@reduxjs/toolkit";
import gameBoardSliceReducer from "./slices/boardSlice";
import gameSettingsSliceReducer from "./slices/gameSettigsSlice";

const store  = configureStore({
  reducer: {
    gameBoard: gameBoardSliceReducer,
    settings: gameSettingsSliceReducer,
  }
});

export default store;
