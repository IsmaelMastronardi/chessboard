import { useDispatch, useSelector } from "react-redux";
import SettingsMenu from "../settingsMenu";
import SquareForEditor from "./squareForEditor";
import { useState } from "react";

const BoardEditor = () => {
  const {editorConvertedBoard, } = useSelector((store) => store.boardEditor);
  const {playerColor} = useSelector((store) => store.settings);
  const [playMenuOpen, settingsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  return(
    <div className="holder">
      <div className={`board boardHolder ${playerColor === 'white' ? '' : 'rotatedGameBoard'}`} >
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