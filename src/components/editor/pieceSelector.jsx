import { useDispatch } from "react-redux";
import { updateChosenAction } from "../../redux/slices/boardEditorSlice";
import Pieces from "../pieces";

const PieceSelector = ({pieces}) => {
  const dispatch = useDispatch();
  return(
    <div className="pieceSelector">
      <ul className="flex">
        <li className="pushable">
          <button 
            className="w-full h-full p-2 front"
            onClick={() => dispatch(updateChosenAction('X'))}>
              <img src="../../../images/trash.png" alt="trash" className="w-full h-full"/>
          </button>
        </li>
        {pieces.map((piece) => {
          return (
            <li key={piece} className="pushable">
              <button 
              className="w-full h-full p-2 front"
              onClick={() => dispatch(updateChosenAction(piece))}>
                <Pieces value={piece} />
              </button>
            </li>
          )
        })}
         <li className="pushable">
          <button 
            className="w-full h-full p-2 front"
            onClick={() => dispatch(updateChosenAction('move'))}>
              <img src="../../../images/hand.png" alt="trash" className="w-full h-full"/>
          </button>
        </li>
      </ul>
    </div>
  )
};

export default PieceSelector;