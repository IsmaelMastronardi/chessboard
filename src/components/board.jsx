import { useSelector } from "react-redux";
import Square from "./square";

const Board = ({boardStateIndex, lastBoardStateIndex}) => {
  const {posibleMoves, selectedPiece, pastBoardStates } = useSelector((store) => store.gameBoard);
  const {playerColor} = useSelector((store) => store.settings);

  return(
    <div className="holder holderLong">
      <div className={`board  ${playerColor === 'white' ? 'boardHolder' : 'rotatedBoard rotatedHolder'}`} >
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