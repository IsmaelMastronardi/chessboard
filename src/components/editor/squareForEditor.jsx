import { useDispatch, useSelector } from "react-redux";
import PositionIndicator from "../positionIndicator";
import { clearSquare, updateEditorBoard } from "../../redux/slices/boardEditorSlice";
import { useDrag, useDrop } from "react-dnd";
import Pieces from "../pieces";



const SquareForEditor = ({value, isDark, index, posibleSquare, isCurrentBoardState }) => {
  const {playerColor, squareBackgroundColor} = useSelector((store) => store.settings);
  const {chosenAction} = useSelector((store) => store.boardEditor);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (chosenAction === 'X') {
      dispatch(updateEditorBoard({row: index[0], col: index[1], value: '0'}));
    }
    else if (chosenAction !== 'move') {
      dispatch(updateEditorBoard({row: index[0], col: index[1], value: chosenAction}));
    }
  };

  const [, drag] = useDrag({
    type: 'PIECE',
    item: { index: index, piece: value},
  });

  const [, drop] = useDrop({
    accept: 'PIECE',
    drop: (item) => {
      if (chosenAction === 'move'){
        dispatch(clearSquare({row: item.index[0], col: item.index[1]}));
        dispatch(updateEditorBoard({row: index[0], col: index[1], value: item.piece}));
      }
    } 
  });

  return (
    <>
      <div
        className={`square ${playerColor === 'white' ? '' : 'rotatedSquare'}`}
        style={{
          background: isDark ? squareBackgroundColor : "white",
        }}
        onClick={() => handleClick()}
        ref={drop}
        >
        <PositionIndicator row={index[0]} col={index[1]} />
        <div className="w-8 h-8" ref={drag}>
          <Pieces value={value} />
        </div>
      </div>
    </>
  );
}

export default SquareForEditor;