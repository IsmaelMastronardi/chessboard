import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  boardColor: 'light',
  squareBackgroundColor: '#228B22',
  pcDepth: 3,
};

const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
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

export const { updateBoardColor, updatesquareBackgroundColor, updatePcDepth } = gameSettingsSlice.actions;
export default gameSettingsSlice.reducer;