import { useDispatch, useSelector } from "react-redux";
import { changePlayerColor } from "../redux/slices/gameSettigsSlice";
import { returnToStart, startFromPosition, startGame } from "../redux/slices/boardSlice";
import { useNavigate } from "react-router-dom";
import Pieces from "./pieces";
import { useState } from "react";

const StartMenu = ({toggleMenu, startGameMenu, fromEditor = false}) => {
  const {editorConvertedBoard} = useSelector((store) => store.boardEditor);
  const {playerColor} = useSelector((store) => store.settings);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [chosenDifficulty, setChosenDifficulty] = useState(1);

  const changeDifficulty = (difficulty) => {
    setChosenDifficulty(difficulty);
  };

  const chooseColor = (color) => {
    dispatch(changePlayerColor(color));
  };

  return (
      <div className='menu'>
        <div className="">
          <div>
            <p>Choose Difficulty:</p>
          </div>
          <ul className="flex">
            <li>
              <button 
                className={` ${chosenDifficulty === 1 ? 'startMenuButtonChoosen' : 'startMenuButton'} `}
                onClick={() => changeDifficulty(1)}>
                Easy
              </button>
            </li>
            <li>
              <button 
              className={` ${chosenDifficulty === 2 ? 'startMenuButtonChoosen' : 'startMenuButton'} `}
              onClick={() => changeDifficulty(2)}>
                Medium
              </button>
            </li>
            <li>
              <button
              className={` ${chosenDifficulty === 3 ? 'startMenuButtonChoosen' : 'startMenuButton'} `}
              onClick={() => changeDifficulty(3)}>
                Hard
              </button>
            </li>
          </ul>
          <div>
            <p>Choose Color:</p>
          </div>
          <div className="flex justify-around w-full h-20">
            <button onClick={() => chooseColor('white')} className={` text-white ${playerColor === 'white' ? 'chosenColor': 'choseColorButton'}`}>
              <Pieces value="K" />
            </button>
            <button onClick={() => chooseColor('black')} className={` text-black ${playerColor === 'black' ? 'chosenColor': 'choseColorButton'}`}>
              <Pieces value="k" />
            </button>
          </div>
          <div className="flex justify-center w-full gap-8">
            <button
            className="startMenuButton"
            onClick={
              () => {
                if(fromEditor){
                  dispatch(startFromPosition([editorConvertedBoard, playerColor]));
                  navigate('/');
                }
                else {
                  dispatch(startGame(playerColor !== 'white'));
                  toggleMenu();
                }
              }}>
              Start
            </button>
            <button 
            className="startMenuButton"
            onClick={
              () => {
                dispatch(returnToStart())
                toggleMenu();
              }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
};

export default StartMenu;