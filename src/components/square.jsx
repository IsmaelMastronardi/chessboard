import { useDrag, useDrop } from "react-dnd";
import { movePiece, selectPiece } from "../redux/slices/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectPieceIcon } from "../gameLogic/pieces";
import { useState } from "react";


const Square = ({value, isDark, index, posibleSquare }) => {
  const {posibleMoves, selectedPiece} = useSelector((store) => store.gameBoard);
  const {squareBackgroundColor} = useSelector((store) => store.settings);
  const [promotionMenu, setPromotionMenu] = useState(false);

  // const [promotionPiece, setPromotionPiece] = useState(undefined);
  const [selectedMove, setSelectedMove] = useState(undefined);

  const dispatch = useDispatch();

  const executeMove = (oldPos, newPos, piece) => {
    dispatch(movePiece(oldPos, newPos, false, pawnIsPromoting(piece, newPos)));
  };

  const saveMove = (move) => {
    setSelectedMove(move);
  }

  const togglePromotionMenu = () => {
    setPromotionMenu(!promotionMenu);
  };

  const promotionSelect = (promotionPiece) => {
    setSelectedMove(undefined);
    togglePromotionMenu();
    executeMove(selectedMove.move[0], selectedMove.move[1], false, selectedMove.promotion, promotionPiece);
  }

  const handleClick = () => {
    dispatch(selectPiece(index));
  }

  const findMove = (arr, move) => {
    return arr.find(obj => obj.move && obj.move[0] === move[0] && obj.move[1] === move[1])
  };

  const pawnIsPromoting = (piece, index) => {
    if(piece.toLowerCase() === 'p' && (index[0] === 0 || index[0] === 7)){
      return true;
    }
    return false;
  };

  const handleDrop = (oldPos, newPos, piece) => {
    const selectedMove = findMove(posibleMoves[`${oldPos[0]}${oldPos[1]}`], newPos);
    if(selectedMove){
      if(piece.toLowerCase() === 'p'){
        if(selectedMove.promotion){
          saveMove(selectedMove);
          togglePromotionMenu();
          // dispatch(movePiece(oldPos, newPos, false, true));
        }
      }
      else {
        executeMove(oldPos, index, false, pawnIsPromoting(piece, newPos))
      }
    }
  };

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
    <><div
      className={`border flex justify-center items-center border-gray-400 text-center relative w-full h-full p-0 `}
      ref={drop}
      onClick={handleClick}
      style={{
        background: isDark ? squareBackgroundColor : "white",
      }}
    >
      {index[1] === 0 && (
        <div className="absolute top-0 left-0 text-xs font-bold">
          {index[0] + 1}
        </div>
      )}
      {index[0] === 7 && (
        <div className="absolute bottom-0 right-0 text-xs font-bold">
          {String.fromCharCode(65 + index[1])}
        </div>
      )}
      {posibleSquare && (
        <div className="absolute top-0 bottom-0 left-0 right-0 w-6 h-6 m-auto bg-gray-300 rounded-full opacity-80"></div>
      )}
      <div className="w-6 h-6" onDragStart={handleClick} ref={drag}>
        {piece}
      </div>
      {/* <div className="absolute top-0 left-0 w-40 h-40 bg-gray-400"></div> */}
    </div>
    {promotionMenu && (
      <div className="absolute z-10 m-auto bg-white">
        <ul>
          <li>
            <button
              onClick={promotionSelect}
            >
              QUEEN
            </button>
          </li>
          <li>
            <button
            onClick={() => {
              togglePromotionMenu();
              saveMove(undefined);
            }}
            >
              X
            </button>
          </li>
        </ul>
      </div>
    )}
    </>
  );
}

export default Square;