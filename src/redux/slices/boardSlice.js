import { createSlice } from "@reduxjs/toolkit";
import { calculatePosibleMoves } from "../../gameLogic/generateMoves";
import { convertToBoard, convertToFen } from "../../gameLogic/helpers";
import { finalizeMove } from "../../gameLogic/completeMove";

export const movePiece = (oldIndex, move, isPcMove) => (dispatch) => {
  console.log('movingPiece');
  dispatch(gameBoardSlice.actions.updateBoard({oldIndex, move, isPcMove}));
};

export const selectPiece = (index) => (dispatch) => {
  dispatch(gameBoardSlice.actions.updateSelectedPiece(index));
};
export const getPosibleMoves = (board, color) => (dispatch) => {
  const allyColor = color === 'w' ? 'white' : 'black';
  const result = calculatePosibleMoves(board, allyColor);
  dispatch(gameBoardSlice.actions.updatePosibleMoves(result));
};
// const initalBoardPosition = "k7/7P/8/8/8/8/8/K7 w KQkq - 0 1";
const initalBoardPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";


const initialState = {
  fenBoard: initalBoardPosition,
  convertedBoard: convertToBoard(initalBoardPosition),
  posibleMoves: calculatePosibleMoves(convertToBoard(initalBoardPosition), 'white'),
  selectedPiece: '',
  waitingForPcMove: false,
  playerColor: 'black',
  gameStarted: false,
  pastBoardStates: [convertToBoard(initalBoardPosition)],
  lastBoardStateIndex: 0,
};

const gameBoardSlice = createSlice({
  name: 'gameBoard',
  initialState,
  reducers: {
    updateBoard: (state, action) => {
      state.selectedPiece = '';
      state.convertedBoard = finalizeMove(state.convertedBoard, action.payload.oldIndex, action.payload.move);
      state.fenBoard = convertToFen(state.convertedBoard);
      const moves = calculatePosibleMoves(state.convertedBoard, state.convertedBoard.turn === 'w' ? 'white' : 'black');
      state.posibleMoves = moves;
      state.waitingForPcMove = !action.payload.isPcMove;
      state.pastBoardStates.push(state.convertedBoard);
      state.lastBoardStateIndex +=1
    },
    updateSelectedPiece: (state, action) => {
      state.selectedPiece = action.payload;
    },
    updatePosibleMoves: (state, action) => {
      state.posibleMoves = action.payload;
    },
  },
});

export default gameBoardSlice.reducer;

