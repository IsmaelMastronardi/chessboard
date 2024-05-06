import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  playerColor: 'white',
  boardColor: 'light',
  squareBackgroundColor: '#228B22',
  pcDepth: 3,
};

const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    changePlayerColor: (state, action) => {
      state.playerColor = action.payload
    },
    updateBoardColor: (state, action) => {
      state.boardColor = action.payload;
    },
    updatesquareBackgroundColor: (state, action) => {
      state.squareBackgroundColor = action.payload;
    },
    updatePcDepth: (state, action) => {
      state.pcDepth = action.payload;
    },
  },
});

export const { changePlayerColor, updateBoardColor, updatesquareBackgroundColor, updatePcDepth } = gameSettingsSlice.actions;
export default gameSettingsSlice.reducer;