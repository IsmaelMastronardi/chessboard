import { useDispatch, useSelector } from "react-redux";
import BoardEditor from "../components/editor/boardEditor";
import PieceSelector from "./pieceSelector";
import EditorSettings from "../components/editor/editorSettings";

const Editor = () => {
  const dispatch = useDispatch();
  const whitePieces = ['K', 'Q', 'R', 'B', 'N', 'P'];
  const blackPieces = ['k', 'q', 'r', 'b', 'n', 'p'];

  return(
    <div className="relative flex flex-col items-center justify-center gap-4 pt-12">
      <PieceSelector pieces={blackPieces} />
      <BoardEditor />
      <PieceSelector pieces={whitePieces} />
      <EditorSettings />
    </div>
  )
}

export default Editor;