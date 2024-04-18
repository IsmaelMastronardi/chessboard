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

  const pawnIsPromoting = (piece, index) => {
    if(piece.toLowerCase() === 'p' && (index[0] === 0 || index[0] === 7)){
      return true;
    }
    return false;
  };

  const handleClick = () => {
    dispatch(selectPiece(index));
  }

  const handleDrop = (oldPost, newPos, piece) => {
    if(validateMove(newPos)){
      dispatch(movePiece(oldPost, index, false, pawnIsPromoting(piece, newPos)));
    }
  }

  const [, drag] = useDrag({
    type: 'PIECE',
    item: { index: index, piece: value},
  });

  const [, drop] = useDrop({
    accept: 'PIECE',
    drop: (item) => {
      handleDrop(item.index, index, item.piece);
    } 
  });

  const piece = selectPieceIcon(value);
  return (
    <div className={`border flex justify-center items-center border-gray-400 text-center relative w-full h-full p-0 ${bgColor}`} ref={drop} onClick={handleClick}>
      {posibleSquare &&
        <div className="absolute w-6 h-6 bg-gray-300 rounded-full top-7 right-7 opacity-80"></div>}
      <div className="w-6 h-6" onDragStart={handleClick} ref={drag}>{piece}</div>
      {/* <div className="absolute top-0 left-0 w-40 h-40 bg-gray-400"></div> */}
    </div>
  )
}

export default Square;