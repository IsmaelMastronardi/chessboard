import { useDispatch, useSelector } from "react-redux";
import { changePlayerColor } from "../redux/slices/gameSettigsSlice";
import { blackKingIcon, whiteKingIcon } from "../gameLogic/pieces";
import { returnToStart, startFromPosition, startGame } from "../redux/slices/boardSlice";
import { useNavigate } from "react-router-dom";

const StartMenu = ({toggleMenu, fromEditor = false}) => {
  const {editorConvertedBoard, boardIsPlayable} = useSelector((store) => store.boardEditor);
  const {playerColor} = useSelector((store) => store.settings);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chooseColor = (color) => {
    dispatch(changePlayerColor(color))
  };
  return (
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
          <button onClick={() => chooseColor('white')}>
            {whiteKingIcon}
          </button>
          <button onClick={() => chooseColor('black')}>
            {blackKingIcon}
          </button>
        </div>
        <div>
          <button onClick={
            () => {
              if(fromEditor){
                dispatch(startFromPosition(editorConvertedBoard));
                navigate('/');
              }
              else {
                dispatch(startGame(playerColor === 'black'));
                toggleMenu();
              }
            }}>
            Start
          </button>
          <button
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