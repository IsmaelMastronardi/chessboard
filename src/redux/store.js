import { configureStore } from "@reduxjs/toolkit";
import gameBoardSliceReducer from "./slices/boardSlice";
import gameSettingsSliceReducer from "./slices/gameSettigsSlice";
import boardEditorSliceReducer from "./slices/boardEditorSlice";


const store  = configureStore({
  reducer: {
    gameBoard: gameBoardSliceReducer,
    settings: gameSettingsSliceReducer,
    boardEditor: boardEditorSliceReducer,
  }
});

export default store;
