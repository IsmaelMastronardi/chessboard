import { useDispatch, useSelector } from "react-redux";
import BoardEditor from "../components/editor/boardEditor";
import PieceSelector from "../components/editor/pieceSelector";
import EditorSettings from "../components/editor/editorSettings";
import { useState } from "react";
import StartMenu from "../components/startMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Editor = () => {
  const dispatch = useDispatch();
  const [startGameMenu, setStartGameMenu] = useState(false);
  const whitePieces = ['K', 'Q', 'R', 'B', 'N', 'P'];
  const blackPieces = ['k', 'q', 'r', 'b', 'n', 'p'];

  const toggleMenu = () => {
    setStartGameMenu(!startGameMenu);
  }


  return(
    <div className="relative flex flex-col items-center justify-center gap-4 pt-12">
      <PieceSelector pieces={blackPieces} />
      <BoardEditor />
      <PieceSelector pieces={whitePieces} />
      <EditorSettings toggleMenu={toggleMenu}/>
      {startGameMenu && <StartMenu toggleMenu={toggleMenu} fromEditor={true}/>}
    </div>
  )
}

export default Editor;