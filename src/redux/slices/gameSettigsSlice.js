const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  boardColor: 'light',
  pieceStyle: 'initial',
  pcDepth: 3,
};

const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    updateBoardColor: (state, action) => {
      state.boardColor = action.payload;
    },
    updatePieceStyle: (state, action) => {
      state.pieceStyle = action.payload;
    },
    updatePcDepth: (state, action) => {
      state.pcDepth = action.payload;
    },
  },
});

export const { updateBoardColor, updatePieceStyle, updatePcDepth } = gameSettingsSlice.actions;
export default gameSettingsSlice.reducer;