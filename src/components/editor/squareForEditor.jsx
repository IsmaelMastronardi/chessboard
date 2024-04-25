import { useDispatch, useSelector } from "react-redux";
import { selectPieceIcon } from "../../gameLogic/pieces";
import PositionIndicator from "../positionIndicator";
import { updateEditorBoard } from "../../redux/slices/boardEditorSlice";



const SquareForEditor = ({value, isDark, index, posibleSquare, isCurrentBoardState }) => {
  const {playerColor, squareBackgroundColor} = useSelector((store) => store.settings);
  const {chosenAction} = useSelector((store) => store.boardEditor);
  const dispatch = useDispatch();

  const piece = selectPieceIcon(value);

  const handleClick = () => {
    if (chosenAction === 'X') {
      dispatch(updateEditorBoard({row: index[0], col: index[1], value: ''}));
    } else if (chosenAction !== '') {
      dispatch(updateEditorBoard({row: index[0], col: index[1], value: chosenAction}));
    }
  };

  return (
    <>
      <div
        className={`border flex justify-center items-center border-gray-400 text-center relative w-full h-full p-0 square ${playerColor === 'white' ? '' : 'rotatedSquare'}`}
        style={{
          background: isDark ? squareBackgroundColor : "white",
        }}
        onClick={() => handleClick()}>
        <PositionIndicator row={index[0]} col={index[1]} />
        <div className="w-6 h-6">
          {piece}
        </div>
      </div>
    </>
  );
}

export default SquareForEditor;