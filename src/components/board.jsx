import { useDispatch, useSelector } from "react-redux";
import Square from "./square";
import { useEffect } from "react";
import { movePiece } from "../redux/slices/boardSlice";
import { minimax } from "../engine/boardEvaluation";

const Board = () => {
  const {fenBoard, convertedBoard, posibleMoves, selectedPiece, waitingForPcMove} = useSelector((store) => store.gameBoard);
  const dispatch = useDispatch();
  console.log(fenBoard);
  useEffect(() => {
    if (waitingForPcMove) {
      setTimeout(() => {
        const result = minimax(convertedBoard, 3, false);
        dispatch(movePiece(result.piece, result.move, true));
      }, 100);
    }
  });
  return(
    <section className="flex flex-col items-center gap-10">
      <p>board</p>
      <div className="grid grid-cols-8">
      {convertedBoard.pieces.map((row, rowIndex) => {
        return row.map((square, colIndex) => {
          const isDark = (rowIndex + colIndex) % 2 === 1;
          let highlighted = false;
          if(selectedPiece && JSON.stringify(posibleMoves[`${selectedPiece[0]}${selectedPiece[1]}`])?.includes(JSON.stringify([rowIndex, colIndex]))){
            highlighted = true;
          }
          else {
            highlighted = false;
          }
          return (
            <div key={`${rowIndex}-${colIndex}`} className="col-span-1">
              <Square
              value={square}
              isDark={isDark}
              index={[rowIndex, colIndex]}
              posibleSquare={highlighted}/>
            </div>
          );
        })
      })}
    </div>
    </section>
  )
}

export default Board;