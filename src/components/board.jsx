import { useDispatch, useSelector } from "react-redux";
import Square from "./square";
import { useEffect } from "react";
import { addNotation, createNotation, movePiece, updateSelectedMove } from "../redux/slices/boardSlice";
import { minimax } from "../engine/boardEvaluation";

const Board = ({boardStateIndex, lastBoardStateIndex}) => {
  const {convertedBoard, posibleMoves, selectedPiece, waitingForPcMove, pastBoardStates} = useSelector((store) => store.gameBoard);
  const {playerColor} = useSelector((store) => store.settings);
  const dispatch = useDispatch();
  useEffect(() => {
    if (waitingForPcMove) {
      const result = minimax(convertedBoard, 3, false);
      dispatch(updateSelectedMove({
        piece: convertedBoard.pieces[[result.piece[0]]][result.piece[1]],
        from: result.piece,
        to: result.move,
      }));
      dispatch(createNotation(
        convertedBoard.pieces[[result.piece[0]]][result.piece[1]],
        result.piece,
        result.move,
        convertedBoard.fullMove
      ))
      dispatch(movePiece(result.piece, result.move, true));
    }
  });

  return(
    <div className="">
      <div className={`board ${playerColor === 'white' ? '' : 'rotatedGameBoard'}`} >
      {pastBoardStates[boardStateIndex].pieces.map((row, rowIndex) => {
        return row.map((square, colIndex) => {
          const isDark = (rowIndex + colIndex) % 2 === 1;
          let highlighted = false;
          if(selectedPiece && JSON.stringify(posibleMoves[`${selectedPiece[0]}${selectedPiece[1]}`])?.includes(JSON.stringify([rowIndex, colIndex]))){
            highlighted = true;
          }
          return (
            <div key={`${rowIndex}-${colIndex}`} className="w-12 h-12 col-span-1">
              <Square
              value={square}
              isDark={isDark}
              index={[rowIndex, colIndex]}
              posibleSquare={highlighted}
              isCurrentBoardState={boardStateIndex === lastBoardStateIndex}
              />
            </div>
          );
        })
      })}
    </div>
    </div>
  )
}

export default Board;