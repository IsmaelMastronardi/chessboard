import { useDispatch, useSelector } from "react-redux";
import Square from "./square";
import { useEffect, useState } from "react";
import { movePiece } from "../redux/slices/boardSlice";
import { minimax } from "../engine/boardEvaluation";
import SettingsMenu from "./settingsMenu";

const Board = () => {
  const {convertedBoard, posibleMoves, selectedPiece, waitingForPcMove, pastBoardStates, lastBoardStateIndex} = useSelector((store) => store.gameBoard);
  const dispatch = useDispatch();
  const [boardStateIndex, setBoardStateIndex] = useState(lastBoardStateIndex);

  useEffect(() => {
    if (waitingForPcMove) {
      const result = minimax(convertedBoard, 3, false);
      dispatch(movePiece(result.piece, result.move, true));
    }
  });

  useEffect(() => {
    setBoardStateIndex(lastBoardStateIndex);
  }, [lastBoardStateIndex]);


  const changeBoardState = (direction) => {
    if(boardStateIndex + direction >= 0 && boardStateIndex + direction < pastBoardStates.length){
      setBoardStateIndex(boardStateIndex + direction);
    }
  };

  useEffect(() => {
    const handleArrowKey = (e) => {
      if(e.key === 'ArrowLeft'){
        console.log('here')
        changeBoardState(-1);
      }
      if(e.key === 'ArrowRight'){
        console.log('here2')
        changeBoardState(1);
      }
    };
    document.addEventListener('keydown', handleArrowKey);
    return () => document.removeEventListener('keydown', handleArrowKey);
  });





  return(
    <section className="">
      <div className="grid grid-cols-8 gameBoard">
      {pastBoardStates[boardStateIndex].pieces.map((row, rowIndex) => {
        return row.map((square, colIndex) => {
          const isDark = (rowIndex + colIndex) % 2 === 1;
          let highlighted = false;
          if(selectedPiece && JSON.stringify(posibleMoves[`${selectedPiece[0]}${selectedPiece[1]}`])?.includes(JSON.stringify([rowIndex, colIndex]))){
            highlighted = true;
          }
          return (
            <div key={`${rowIndex}-${colIndex}`} className="w-12 h-12 col-span-1">
              <Square
              value={square}
              isDark={isDark}
              index={[rowIndex, colIndex]}
              posibleSquare={highlighted}
              isCurrentBoardState={boardStateIndex === lastBoardStateIndex}
              />
            </div>
          );
        })
      })}
    </div>
    <div className="flex items-start w-full">
      <SettingsMenu />
    </div>
    <div className="flex justify-between w-full">
      <button onClick={() => changeBoardState(-1)}>&lt;---</button>
      <button onClick={() => changeBoardState(1)}>---&gt;</button>
    </div>
    </section>
  )
}

export default Board;