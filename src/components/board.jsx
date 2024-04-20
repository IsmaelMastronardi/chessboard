import { useDispatch, useSelector } from "react-redux";
import Square from "./square";
import { useEffect } from "react";
import { movePiece } from "../redux/slices/boardSlice";
import { minimax } from "../engine/boardEvaluation";
import SettingsMenu from "./settingsMenu";

const Board = () => {
  const {convertedBoard, posibleMoves, selectedPiece, waitingForPcMove, playerColor} = useSelector((store) => store.gameBoard);
  const dispatch = useDispatch();
  // console.log(posibleMoves);
  // useEffect(() => {
  //   if (waitingForPcMove) {
  //     setTimeout(() => {
  //       const result = minimax(convertedBoard, 3, false);
  //       dispatch(movePiece(result.piece, result.move, true));
  //     }, 100);
  //   }
  // });
  return(
    <section className="">
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
            <div key={`${rowIndex}-${colIndex}`} className="w-12 h-12 col-span-1">
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
    <div className="flex items-start w-full">
      <SettingsMenu />
    </div>
    </section>
  )
}

export default Board;