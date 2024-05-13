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
      <button
        className={`${boardIsPlayable ? 'bg-green-500' : 'bg-red-500'}`}
        onClick={() => { if(boardIsPlayable && !startGameMenu){toggleMenu()} }}
        >
          Play
        </button>
      <EditorSettings toggleMenu={toggleMenu}/>
      <StartMenu toggleMenu={toggleMenu} startGameMenu={startGameMenu} fromEditor={true}/>
    </div>
  )
}

export default Editor;