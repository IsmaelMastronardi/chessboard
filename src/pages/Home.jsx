import Board from "../components/board";
import { useState } from "react";
import PastMoves from "../components/pastMoves";
import StartMenu from "../components/startMenu";

const Home = () => {
  const [startGameMenu, setStartGameMenu] = useState(false);
  const toggleMenu = () => {
    setStartGameMenu(!startGameMenu);
  }


  return(
    <div className="relative flex flex-col items-center justify-center gap-4 pt-12">
      <div className="flex gap-20">
        <button
        className="bg-gray-500 border"
        onClick={toggleMenu}
        >Start
        </button>
        <button className="bg-gray-500 border">Surrender</button>
      </div>
      <Board />
      {startGameMenu && <StartMenu toggleMenu={toggleMenu}/>}
      <PastMoves />
    </div>
  )
}
export default Home;
