import { useDrag, useDrop } from "react-dnd";
import { movePiece, selectPiece } from "../redux/slices/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectPieceIcon } from "../gameLogic/pieces";
import { useState } from "react";


const Square = ({value, isDark, index, posibleSquare, inCurrentBoard }) => {
  const {posibleMoves} = useSelector((store) => store.gameBoard);
  const {squareBackgroundColor} = useSelector((store) => store.settings);
  const [promotionMenu, setPromotionMenu] = useState(false);

  // const [promotionPiece, setPromotionPiece] = useState(undefined);
  const [selectedMove, setSelectedMove] = useState(undefined);

  const dispatch = useDispatch();

  const executeMove = (oldPos, newPos, piece) => {
    dispatch(movePiece(oldPos, newPos, false));
  };

  const saveMove = (from, to) => {
    setSelectedMove({from, to});
  }

  const togglePromotionMenu = () => {
    setPromotionMenu(!promotionMenu);
  };

  const promotionSelect = (promotionPiece) => {
    setSelectedMove(undefined);
    togglePromotionMenu();
    console.log(posibleMoves[`${selectedMove.from[0]}${selectedMove.from[1]}`]);
    const move = posibleMoves[`${selectedMove.from[0]}${selectedMove.from[1]}`].find(obj => obj.move && obj.move[0] === selectedMove.to[0] && obj.move[1] === selectedMove.to[1] && obj.promotionPiece === promotionPiece);
    console.log(move);
    executeMove(selectedMove.from, move, false);
  }

  const handleClick = () => {
    dispatch(selectPiece(index));
  }

  const findMove = (arr, move) => {
    return arr.find(obj => obj.move && obj.move[0] === move[0] && obj.move[1] === move[1])
  };

  const handleDrop = (oldPos, newPos, piece) => {
    console.log(posibleMoves[`${oldPos[0]}${oldPos[1]}`]);
    if(!posibleMoves[`${oldPos[0]}${oldPos[1]}`]){
      return;
    }
    const selectedMove = findMove(posibleMoves[`${oldPos[0]}${oldPos[1]}`], newPos);
    if(selectedMove){
      if(selectedMove.promotion){
        saveMove(oldPos, newPos);
        togglePromotionMenu();
      }
      else {
        executeMove(oldPos, selectedMove, false);
      }
    }
  };

  const [, drag] = useDrag({
    drag: () => {
      if(!inCurrentBoard){return;}
    },
    type: 'PIECE',
    item: { index: index, piece: value},
  });

  const [, drop] = useDrop({
    accept: 'PIECE',
    drop: (item) => {
      if(!inCurrentBoard){return;}
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
            <button onClick={() => promotionSelect('Q')}>QUEEN</button>
          </li>
          <li>
            <button onClick={() => promotionSelect('N')}>KNIGTH</button>
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