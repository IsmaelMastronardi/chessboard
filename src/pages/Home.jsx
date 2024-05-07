import Board from "../components/board";
import { useState } from "react";
import StartMenu from "../components/startMenu";

const Home = () => {
  const [startGameMenu, setStartGameMenu] = useState(false);
  const toggleMenu = () => {
    setStartGameMenu(!startGameMenu);
  }


  return(
    <section className="home">
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
    </section>
  )
}
export default Home;
