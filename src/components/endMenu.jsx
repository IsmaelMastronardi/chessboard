import { useDispatch, useSelector } from "react-redux";
import { returnToStart, startGame } from "../redux/slices/boardSlice";
import { changePlayerColor } from "../redux/slices/gameSettigsSlice";

const EndMenu = ({changeBoardState}) => {
  const {playerColor} = useSelector((store) => store.settings);
  const dispatch = useDispatch();

  const chooseColor = (color) => {
    dispatch(changePlayerColor(color));
  };
    return (
        <div className="text-white">
            <h1>Game Over</h1>
            <button onClick={() =>{
              changeBoardState(0);
              dispatch(returnToStart());
            }
            }>Restart</button>
            <button onClick={() =>{
              changeBoardState(0);
              dispatch(returnToStart());
              chooseColor(playerColor === 'white' ? 'black' : 'white');

              dispatch(startGame(playerColor === 'black'));
            }
            }>Rematch</button>
        </div>
    );
};

export default EndMenu;