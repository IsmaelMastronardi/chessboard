import { useDispatch } from "react-redux";
import { updateChosenAction } from "../../redux/slices/boardEditorSlice";
import Pieces from "../pieces";

const PieceSelector = ({pieces}) => {
  const dispatch = useDispatch();
  return(
    <div className="pieceSelector buttonHolder">
      <ul className="flex gap-1">
        <li className="buttonBack">
          <span className="buttonShadow">
            <button 
              className="w-full h-full p-2 buttonFront"
              onClick={() => dispatch(updateChosenAction('X'))}>
                <img src="../../../images/trash.png" alt="trash" className="w-full h-full"/>
            </button>
          </span>
        </li>
        {pieces.map((piece) => {
          return (
            <li key={piece} className="buttonBack">
              <span className="buttonShadow">
                <button 
                className="w-full h-full p-2 buttonFront"
                onClick={() => dispatch(updateChosenAction(piece))}>
                  <Pieces value={piece} />
                </button>
              </span>
            </li>
          )
        })}
         <li className="buttonBack">
          <span className="buttonShadow">
            <button 
              className="w-full h-full p-2 buttonFront"
              onClick={() => dispatch(updateChosenAction('move'))}>
                <img src="../../../images/hand.png" alt="trash" className="w-full h-full"/>
            </button>
          </span>
        </li>
      </ul>
    </div>
  )
};

export default PieceSelector;