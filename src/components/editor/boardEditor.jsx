import { useSelector } from "react-redux";
import SquareForEditor from "./squareForEditor";

const BoardEditor = () => {
  const {editorConvertedBoard} = useSelector((store) => store.boardEditor);
  const {playerColor} = useSelector((store) => store.settings);
  return(
    <div className="holder">
      <div className={`board ${playerColor === 'white' ? 'boardHolder' : 'rotatedBoard rotatedHolder'}`} >
        {editorConvertedBoard.pieces.map((row, rowIndex) => {
          return row.map((square, colIndex) => {
            const isDark = (rowIndex + colIndex) % 2 === 1;
            let highlighted = false;
            return (
              <div key={`${rowIndex}-${colIndex}`} className="w-12 h-12 col-span-1">
                <SquareForEditor
                value={square}
                isDark={isDark}
                index={[rowIndex, colIndex]}
                posibleSquare={highlighted}
                isCurrentBoardState={true}
                />
              </div>
            );
          })
        })}
      </div>
    </div>
  )
}

export default BoardEditor;