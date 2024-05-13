import Board from "../components/board";
import { useEffect, useState } from "react";
import StartMenu from "../components/startMenu";
import BoardChanger from "../components/boardChanger";
import { useDispatch, useSelector } from "react-redux";
import ChessNotation from "../components/chessNotation";
import { minimax } from "../engine/boardEvaluation";
import { createNotation, makePcMove, movePiece, updateSelectedMove } from "../redux/slices/boardSlice";

const Home = () => {
  const {lastBoardStateIndex, pastBoardStates,gameHasStarted, waitingForPcMove, convertedBoard} = useSelector((store) => store.gameBoard);
  const [startGameMenu, setStartGameMenu] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setStartGameMenu(!startGameMenu);
  }

  console.log(waitingForPcMove)

  useEffect(() => {
    dispatch(makePcMove());
  }, [dispatch, convertedBoard]);


  const [boardStateIndex, setBoardStateIndex] = useState(lastBoardStateIndex);

  useEffect(() => {
    setBoardStateIndex(lastBoardStateIndex);
  }, [lastBoardStateIndex]);


  const changeBoardState = (newIndex) => {
    if(newIndex >= 0 && newIndex < pastBoardStates.length){
      setBoardStateIndex(newIndex);
    }
  };

  return(
    <section className="home">
      <StartMenu toggleMenu={toggleMenu} startGameMenu={startGameMenu}/>
      <Board boardStateIndex={boardStateIndex}/>
      <BoardChanger changeBoardState={changeBoardState} boardStateIndex={boardStateIndex}/>
      <div className="flex gap-20">
        {!gameHasStarted && (
          <button className="buttonBack boxAutoWH startButton" onClick={toggleMenu}>
            <span className="buttonShadow boxAutoWH">
              <span className="buttonFront buttonFront2 buttonFrontWithHover" >Start</span> 
            </span>
          </button>
        )}
        {gameHasStarted && (
          <button className="buttonBack boxAutoWH startButton">
            <span className="buttonShadow boxAutoWH">
              <span className="buttonFront buttonFront2 buttonFrontWithHover" >Resign</span> 
            </span> 
          </button>
        )}
      </div>
      <ChessNotation changeBoardState={changeBoardState} boardStateIndex={boardStateIndex}/>
    </section>
  )
}
export default Home;
