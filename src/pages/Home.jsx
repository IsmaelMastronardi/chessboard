import Board from "../components/board";
import { useEffect, useState } from "react";
import StartMenu from "../components/startMenu";
import BoardChanger from "../components/boardChanger";
import { useDispatch, useSelector } from "react-redux";
import ChessNotation from "../components/chessNotation";
import {makePcMove } from "../redux/slices/boardSlice";
import EndMenu from "../components/endMenu";

const Home = () => {
  const {pastBoardStates, gameHasStarted, convertedBoard, posibleMoves, waitingForPcMove} = useSelector((store) => store.gameBoard);
  const [startGameMenu, setStartGameMenu] = useState(false);
  const [boardStateIndex, setBoardStateIndex] = useState(pastBoardStates.length - 1);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setStartGameMenu(!startGameMenu);
  }

  useEffect(() => {
    dispatch(makePcMove());
  }, [dispatch, convertedBoard, waitingForPcMove]);

  useEffect(() => {
    setBoardStateIndex(pastBoardStates.length - 1);
  }, [pastBoardStates]);


  const changeBoardState = (newIndex) => {
    if(newIndex >= 0 && newIndex < pastBoardStates.length){
      setBoardStateIndex(newIndex);
    }
  };

  return(
    <section className="home">
      <StartMenu toggleMenu={toggleMenu} startGameMenu={startGameMenu}/>
      {posibleMoves === 'checkmate' &&(
        <EndMenu changeBoardState={changeBoardState} gameResult={posibleMoves} />
      )}
      <Board boardStateIndex={boardStateIndex} lastBoardStateIndex={pastBoardStates.length - 1}/>
      <BoardChanger changeBoardState={changeBoardState} boardStateIndex={boardStateIndex}/>
      <div className="flex gap-20">
        {!gameHasStarted && (
          <button className="buttonBack boxAutoWH negMargin" onClick={toggleMenu}>
            <span className="buttonShadow boxAutoWH">
              <span className="buttonFront buttonFront2 buttonFrontWithHover" >Start</span> 
            </span>
          </button>
        )}
        {gameHasStarted && (
          <button className="buttonBack boxAutoWH negMargin">
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
