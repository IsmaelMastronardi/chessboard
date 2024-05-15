import BoardEditor from "../components/editor/boardEditor";
import PieceSelector from "../components/editor/pieceSelector";
import EditorSettings from "../components/editor/editorSettings";
import { useState } from "react";
import StartMenu from "../components/startMenu";
import { useSelector } from "react-redux";


const Editor = () => {
  const {boardIsPlayable} = useSelector((store) => store.boardEditor);
  const [startGameMenu, setStartGameMenu] = useState(false);
  const whitePieces = ['K', 'Q', 'R', 'B', 'N', 'P'];
  const blackPieces = ['k', 'q', 'r', 'b', 'n', 'p'];

  const toggleMenu = () => {
    setStartGameMenu(!startGameMenu);
  }

  return(
    <div className="editor">
      <PieceSelector pieces={blackPieces} />
      <BoardEditor />
      <PieceSelector pieces={whitePieces} />
      <span className="flex gap-10 holder">
        <button className="buttonBack boxAutoWH" onClick={() => { if(boardIsPlayable && !startGameMenu){toggleMenu()} }}>
          <span className={`buttonShadow boxAutoWH ${boardIsPlayable ? '' : 'buttonShadowDisabled'}`}>
            <span className={`buttonFront buttonFront2 buttonFrontWithHover ${boardIsPlayable ? '' : 'buttonFrontDisabled'}`}
            >Play</span> 
          </span>
        </button>
      </span>
      <EditorSettings toggleMenu={toggleMenu}/>
      {startGameMenu && (
        <StartMenu toggleMenu={toggleMenu} startGameMenu={startGameMenu} fromEditor={true}/>
      )}
    </div>
  )
}

export default Editor;