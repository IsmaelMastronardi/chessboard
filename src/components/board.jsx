import { useSelector } from "react-redux";
import Square from "./square";
import { convertToBoard } from "../gameLogic/helpers";
import { getPosibleMoves } from "../redux/slices/boardSlice";

const Board = () => {
  const {convertedBoard, posibleMoves, selectedPiece} = useSelector((store) => store.gameBoard);
  console.log(convertedBoard)
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