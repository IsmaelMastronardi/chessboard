import { useDispatch } from "react-redux";
import { updateChosenAction } from "../../redux/slices/boardEditorSlice";
import Pieces from "../pieces";

const PieceSelector = ({pieces}) => {
  const dispatch = useDispatch();
  return(
    <div className="pieceSelector holder">
      <ul className="flex gap-1">
        <li className="buttonBack box3WH">
          <span className="buttonShadow box3WH">
            <button 
              className="w-full h-full p-2 buttonFront buttonFrontWithHover"
              onClick={() => dispatch(updateChosenAction('X'))}>
                <img src="../../../images/trash.png" alt="trash" className="w-full h-full"/>
            </button>
          </span>
        </li>
        {pieces.map((piece) => {
          return (
            <li key={piece} className="buttonBack box3WH">
              <span className="buttonShadow box3WH">
                <button 
                className="w-full h-full p-2 buttonFront buttonFrontWithHover"
                onClick={() => dispatch(updateChosenAction(piece))}>
                  <Pieces value={piece} />
                </button>
              </span>
            </li>
          )
        })}
         <li className="buttonBack box3WH">
          <span className="buttonShadow box3WH">
            <button 
              className="w-full h-full p-2 buttonFront buttonFrontWithHover"
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