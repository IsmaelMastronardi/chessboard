import { useDispatch, useSelector } from "react-redux";
import { changePlayerColor } from "../redux/slices/gameSettigsSlice";
import { returnToStart, startFromPosition, startGame } from "../redux/slices/boardSlice";
import { useNavigate } from "react-router-dom";
import Pieces from "./pieces";

const StartMenu = ({toggleMenu, fromEditor = false}) => {
  const {editorConvertedBoard, boardIsPlayable} = useSelector((store) => store.boardEditor);
  const {playerColor} = useSelector((store) => store.settings);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chooseColor = (color) => {
    dispatch(changePlayerColor(color))
  };
  return (
      <div className="startMenu">
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
          <button onClick={() => chooseColor('white')}>
            <Pieces value="K" />
          </button>
          <button onClick={() => chooseColor('black')}>
            <Pieces value="k" />
          </button>
        </div>
        <div className="flex justify-center w-full gap-8">
          <button
          className="button2"
          onClick={
            () => {
              // if(fromEditor){
              //   dispatch(startFromPosition(editorConvertedBoard));
              //   navigate('/');
              // }
              // else {
              //   dispatch(startGame(playerColor === 'black'));
              //   toggleMenu();
              // }
            }}>
            Start
          </button>
          <button 
          className="button2"
          onClick={
            () => {
              dispatch(returnToStart())
              toggleMenu();
            }}>
            Cancel
          </button>
        </div>
      </div>
    );
};

export default StartMenu;