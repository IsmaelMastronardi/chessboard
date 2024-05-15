import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { calculatePosibleMoves } from "../../gameLogic/generateMoves";
import { convertToBoard, convertToFen, rowToLetters } from "../../gameLogic/helpers";
import { finalizeMove } from "../../gameLogic/completeMove";
import { minimax, minimaxAsync } from "../../engine/boardEvaluation";

export const movePiece = (oldIndex, move, isPcMove) => (dispatch) => {
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
export const createNotation = (piece, from, move, turn) => (dispatch) => {
  let result;
  if(move.promotion){
    if(move.kingSideCastle){
      result = `${turn}  O-O`
    }
    else {
      result = `${turn}  O-O-O`
    };
    dispatch(gameBoardSlice.actions.addNotation(result));
  };
  let pieceValue = piece;
  if(piece === 'p'|| piece === 'P'){
    pieceValue = rowToLetters(from[1]);
    result = `${turn}.  ${pieceValue}${Math.abs(move.move[0] - 7) + 1}`;
    dispatch(gameBoardSlice.actions.addNotation(result));
  }
  else{
    result = `${turn}.  ${pieceValue.toLowerCase()} ${rowToLetters(move.move[1])}${Math.abs(move.move[0] - 7) + 1}`;
    dispatch(gameBoardSlice.actions.addNotation(result))
  };
};
export const makePcMove = createAsyncThunk(
  'game/makePcMove',
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { convertedBoard, waitingForPcMove, posibleMoves } = state.gameBoard;
    if(posibleMoves === 'checkmate' || posibleMoves === 'stalemate'){
      console.log(posibleMoves)
      dispatch(endGame())
    }
    else if (waitingForPcMove) {
      try {
        const result = await minimaxAsync(convertedBoard, 3, false);
        dispatch(updateSelectedMove({
          piece: convertedBoard.pieces[result.piece[0]][result.piece[1]],
          from: result.piece,
          to: result.move,
        }));
  
        dispatch(createNotation(
          convertedBoard.pieces[result.piece[0]][result.piece[1]],
          result.piece,
          result.move,
          convertedBoard.fullMove
        ));
        
        dispatch(movePiece(result.piece, result.move, true));
        const audioElement = new Audio();
        if(result.move.capture){
          audioElement.src = '/sounds/capture.mp3';
        }
        else {
          audioElement.src = '/sounds/move-self.mp3';
        }
        audioElement.play();
      } catch (error) {
        console.error('Error in makePcMove:', error);
      }
    }
  }
);

const initalBoardPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";



const initialState = {
  fenBoard: initalBoardPosition,
  convertedBoard: convertToBoard(initalBoardPosition),
  posibleMoves: calculatePosibleMoves(convertToBoard(initalBoardPosition), 'white'),
  selectedPiece: '',
  selectedMove: undefined,
  waitingForPcMove: false,
  playerColor: 'white',
  gameStarted: false,
  pastBoardStates: [convertToBoard(initalBoardPosition)],
  gameHasStarted: false,
  chessNotation: [],
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
    },
    updateSelectedPiece: (state, action) => {
      state.selectedPiece = action.payload;
    },
    updateSelectedMove: (state, action) => {
      state.selectedMove = action.payload;
    },
    updatePosibleMoves: (state, action) => {
      state.posibleMoves = action.payload;
    },
    startGame: (state, action) => {
      state.gameHasStarted = true;
      state.waitingForPcMove = action.payload;
    },
    startFromPosition: (state, action) => {
      console.log('staring from editor')
      state.convertedBoard = action.payload[0];
      state.chessNotation = [];
      state.pastBoardStates = [action.payload[0]];
      state.fenBoard = convertToFen(action.payload[0]);
      state.posibleMoves = calculatePosibleMoves(action.payload[0], action.payload[0].turn === 'w' ? 'white' : 'black');
      state.gameHasStarted = true;
      if(action.payload[0].turn === 'b' && action.payload[1] === 'white'){
        state.waitingForPcMove = true;
      }
      else if (action.payload[0].turn === 'w' && action.payload[1] === 'black'){
        state.waitingForPcMove = true;
      }
    },
    endGame: (state) => {
      state.gameHasStarted = false;
      state.posibleMoves = 'checkmate';
      state.waitingForPcMove = false;
    },
    returnToStart: (state) => {
      state.fenBoard = initalBoardPosition;
      state.convertedBoard = convertToBoard(initalBoardPosition);
      state.posibleMoves = calculatePosibleMoves(state.convertedBoard, 'white');
      state.pastBoardStates = [state.convertedBoard];
      state.waitingForPcMove = false;
      state.chessNotation = [];
    },
    addNotation: (state, action) => {
      state.chessNotation.push(action.payload);
    },
  },
});

export const { updateBoard, updateSelectedPiece,updateSelectedMove, updatePosibleMoves, startGame, startFromPosition, endGame, returnToStart } = gameBoardSlice.actions;
export default gameBoardSlice.reducer;

