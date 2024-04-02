import { useDrag, useDrop } from "react-dnd";
import { movePiece, selectPiece } from "../redux/slices/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectPieceIcon } from "../gameLogic/pieces";


const Square = ({value, isDark, index, posibleSquare }) => {
  const {posibleMoves, selectedPiece} = useSelector((store) => store.gameBoard);
  const bgColor = isDark ? 'bg-green-500' : 'bg-white';
  const dispatch = useDispatch();

  const validateMove = (newIndex) => {
    return JSON.stringify(posibleMoves[`${selectedPiece[0]}${selectedPiece[1]}`])?.includes(JSON.stringify([newIndex[0], newIndex[1]]))
  }

  const handleClick = () => {
    dispatch(selectPiece(index));
  }

  const handleDrop = (oldPost, newPos) => {
    if(validateMove(newPos)){
      dispatch(movePiece(oldPost, index));
    }
  }

  const [, drag] = useDrag({
    type: 'PIECE',
    item: { index: index },
  });

  const [, drop] = useDrop({
    accept: 'PIECE',
    drop: (item) => {
      handleDrop(item.index, index);
    } 
  });
  
  const piece = selectPieceIcon(value);
  return (
    <div className={`border border-gray-500 p-4 text-center relative ${bgColor}`} ref={drop} onClick={handleClick}>
      {posibleSquare &&
        <div className="absolute w-6 h-6 bg-gray-300 rounded-full top-7 right-7 opacity-80"></div>}
      <div className="w-12 h-12" onDragStart={handleClick} ref={drag}>{piece}</div>
    </div>
  )
}

export default Square;