import Board from "../components/board";
import { useEffect, useState } from "react";
import StartMenu from "../components/startMenu";
import BoardChanger from "../components/boardChanger";
import { useSelector } from "react-redux";
import ChessNotation from "../components/chessNotation";

const Home = () => {
  const [startGameMenu, setStartGameMenu] = useState(false);
  const {lastBoardStateIndex, pastBoardStates,gameHasStarted} = useSelector((store) => store.gameBoard);
  const toggleMenu = () => {
    setStartGameMenu(!startGameMenu);
  }

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
          <button className="buttonBack buttonBack2 startButton" onClick={toggleMenu}>
            <span className="buttonShadow buttonShadow2">
              <span className="buttonFront buttonFront2" >Start</span> 
            </span>
          </button>
        )}
        {gameHasStarted && (
          <button className="buttonBack buttonBack2 startButton">
            <span className="buttonShadow buttonShadow2">
              <span className="buttonFront buttonFront2" >Resign</span> 
            </span> 
          </button>
        )}
      </div>
      <ChessNotation changeBoardState={changeBoardState} boardStateIndex={boardStateIndex}/>
    </section>
  )
}
export default Home;
