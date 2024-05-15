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
      return 'You Won!';
    }
    return 'You Lost';
  }

  const chooseColor = (color) => {
    dispatch(changePlayerColor(color));
  };

    return (
        <div className="menu">
            <p>
              Game Over<br/>
              {getAutcome()}
            </p>
            <div>
            <button className="startMenuButton" onClick={() =>{
              changeBoardState(0);
              dispatch(returnToStart());
            }}>Restart</button>
            <button className="startMenuButton" onClick={() =>{
              changeBoardState(0);
              dispatch(returnToStart());
              chooseColor(playerColor === 'white' ? 'black' : 'white');
              dispatch(startGame(playerColor === 'white'));
            }}>Rematch</button>
            </div>
        </div>
    );
};

export default EndMenu;