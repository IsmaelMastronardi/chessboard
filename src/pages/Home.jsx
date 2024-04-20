import { useSelector } from "react-redux";
import Board from "../components/board";
import { useState } from "react";
import { blackKingIcon,whiteKingIcon } from "../gameLogic/pieces";

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
        >
          Start
        </button>
        <button className="bg-gray-500 border">Abandon</button>
      </div>
      <Board />
      {startGameMenu && (
        <div className="absolute flex flex-col items-center justify-center gap-2 bg-gray-400 w-60 h-52">
          <div>
            <p>Choose Difficulty:</p>
          </div>
          <ul className="flex gap-10">
            <li><button>Easy</button></li>
            <li><button>Medium</button></li>
            <li><button>Hard</button></li>
          </ul>
          <div>
            <p>Choose Color:</p>
          </div>
          <div className="flex justify-around w-full h-20">
            <button>
              {blackKingIcon}
            </button>
            <button>
              {whiteKingIcon}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default Home;
