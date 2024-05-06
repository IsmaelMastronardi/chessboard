import { useDispatch } from "react-redux";
import { selectPieceIcon } from "../../gameLogic/pieces";
import { updateChosenAction } from "../../redux/slices/boardEditorSlice";


const PieceSelector = ({pieces}) => {
  const dispatch = useDispatch();
  return(
    <div className="">
      <ul className="flex">
        <li>
          <button 
            className="w-10 h-10"
            onClick={() => dispatch(updateChosenAction('X'))}>
              <img src="../../../images/trash.png" alt="trash" className="w-6 h-6"/>
          </button>
        </li>
        {pieces.map((piece) => {
          return (
            <li key={piece}>
              <button 
              className="w-10 h-10"
              onClick={() => dispatch(updateChosenAction(piece))}>
               {selectPieceIcon(piece)}
              </button>
            </li>
          )
        })}
         <li>
          <button 
            className="w-10 h-10"
            onClick={() => dispatch(updateChosenAction('move'))}>
              <img src="../../../images/hand.png" alt="trash" className="w-6 h-6"/>
          </button>
        </li>
      </ul>
    </div>
  )
};

export default PieceSelector;