import { useDrag, useDrop } from "react-dnd";
import { movePiece, selectPiece, startGame } from "../redux/slices/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectPieceIcon } from "../gameLogic/pieces";
import { useState } from "react";
import PositionIndicator from "./positionIndicator";


const Square = ({value, isDark, index, posibleSquare, isCurrentBoardState }) => {
  const {posibleMoves, selectedPiece, gameHasStarted} = useSelector((store) => store.gameBoard);
  const {playerColor, squareBackgroundColor} = useSelector((store) => store.settings);
  const [promotionMenu, setPromotionMenu] = useState(false);

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
    const move = posibleMoves[`${selectedMove.from[0]}${selectedMove.from[1]}`].find(obj => obj.move && obj.move[0] === selectedMove.to[0] && obj.move[1] === selectedMove.to[1] && obj.promotionPiece === promotionPiece);
    console.log(move);
    executeMove(selectedMove.from, move, false);
  }
  const findMove = (arr, move) => {
    return arr.find(obj => obj.move && obj.move[0] === move[0] && obj.move[1] === move[1])
  };

  const handleClick = () => {
    if(!gameHasStarted){
      return;
    }
    if(selectedPiece && posibleSquare){
      handleDrop();
    }
    else {
      dispatch(selectPiece(index));
    }

  }
  const handleDrop = () => {
    if(!posibleMoves[`${selectedPiece[0]}${selectedPiece[1]}`]){
      return;
    }
    const selectedMove = findMove(posibleMoves[`${selectedPiece[0]}${selectedPiece[1]}`], index);
    if(selectedMove){
      if(selectedMove.promotion){
        saveMove(selectedPiece, index);
        togglePromotionMenu();
      }
      else {
        executeMove(selectedPiece, selectedMove, false);
      }
    }
  };

  const [, drag] = useDrag({
    drag: () => {
      if(!isCurrentBoardState){return;}
    },
    type: 'PIECE',
    item: { index: index, piece: value},
  });

  const [, drop] = useDrop({
    accept: 'PIECE',
    drop: (item) => {
      if(!isCurrentBoardState){return;}
      handleDrop(item.index, index, item.piece);
    } 
  });

  const piece = selectPieceIcon(value);
  return (
    <><div
      className={`border flex justify-center items-center border-gray-400 text-center relative w-full h-full p-0 square ${playerColor === 'white' ? '' : 'rotatedSquare'}`}
      ref={drop}
      onClick={handleClick}
      style={{
        background: isDark ? squareBackgroundColor : "white",
      }}
    >
      <PositionIndicator row={index[0]} col={index[1]} />
      {posibleSquare && (
        <div className="absolute top-0 bottom-0 left-0 right-0 w-6 h-6 m-auto bg-gray-300 rounded-full opacity-80"></div>
      )}
      <div className="w-6 h-6" onDragStart={handleClick} ref={drag}>
        {piece}
      </div>
    </div>
    {promotionMenu && (
      <div className={`absolute z-10 m-auto bg-white ${playerColor === 'white' ? '' : 'rotatedPromotionMenu'}`}>
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