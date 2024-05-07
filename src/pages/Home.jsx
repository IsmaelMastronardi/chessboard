import Board from "../components/board";
import { useEffect, useState } from "react";
import StartMenu from "../components/startMenu";
import BoardChanger from "../components/boardChanger";
import { useSelector } from "react-redux";

const Home = () => {
  const [startGameMenu, setStartGameMenu] = useState(false);
  const {lastBoardStateIndex, pastBoardStates} = useSelector((store) => store.gameBoard);
  const toggleMenu = () => {
    setStartGameMenu(!startGameMenu);
  }
  const [boardStateIndex, setBoardStateIndex] = useState(lastBoardStateIndex);
  useEffect(() => {
    setBoardStateIndex(lastBoardStateIndex);
  }, [lastBoardStateIndex]);


  const changeBoardState = (direction) => {
    if(boardStateIndex + direction >= 0 && boardStateIndex + direction < pastBoardStates.length){
      setBoardStateIndex(boardStateIndex + direction);
    }
  };



  return(
    <section className="home">
      <Board boardStateIndex={boardStateIndex}/>
      <BoardChanger changeBoardState={changeBoardState} lastBoardStateIndex={lastBoardStateIndex} />
      <div className="flex gap-20">
        <button
        className="bg-gray-500 border"
        onClick={toggleMenu}
        >Start
        </button>
        <button className="bg-gray-500 border">Surrender</button>
      </div>
      {startGameMenu && <StartMenu toggleMenu={toggleMenu}/>}
    </section>
  )
}
export default Home;
