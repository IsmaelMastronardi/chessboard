import { useDispatch, useSelector } from "react-redux";
import { returnToStart, startGame } from "../redux/slices/boardSlice";
import { changePlayerColor } from "../redux/slices/gameSettigsSlice";

const EndMenu = ({changeBoardState, gameResult}) => {
  const {waitingForPcMove} = useSelector((store) => store.gameBoard);
  const {playerColor} = useSelector((store) => store.settings);
  const dispatch = useDispatch();

  const getAutcome = () => {
      if(gameResult === 'stalemate'){
        return 'Stalemate';
      }
      if(gameResult === 'checkmate' && waitingForPcMove){
        return 'GameOver, You Win';
      }
      return 'GameOver, You Lose';
  }

  const chooseColor = (color) => {
    dispatch(changePlayerColor(color));
  };



    return (
        <div className="text-white">
            <p>
              {getAutcome()}
            </p>
            <button onClick={() =>{
              changeBoardState(0);
              dispatch(returnToStart());
            }
            }>Restart</button>
            <button onClick={() =>{
              changeBoardState(0);
              dispatch(returnToStart());
              chooseColor(playerColor === 'white' ? 'black' : 'white');
              dispatch(startGame(playerColor === 'white'));
            }
            }>Rematch</button>
        </div>
    );
};

export default EndMenu;