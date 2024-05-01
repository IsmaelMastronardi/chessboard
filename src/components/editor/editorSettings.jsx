import { useDispatch, useSelector } from "react-redux";
import { clearBoard, initialPosition } from "../../redux/slices/boardEditorSlice";
import { useState } from "react";

const EditorSettings = () => {
  const {editorConvertedBoard} = useSelector((store) => store.boardEditor)
  const dispatch = useDispatch();
  const [currentTurn, setCurrentTurn] = useState([editorConvertedBoard.turn]);
  const [casteling, setCasteling] = useState([editorConvertedBoard.castling.split('')]);

  const clear = () => {
    dispatch(clearBoard())
  }

  const returnToInitialPosition = () => {
    dispatch(initialPosition())
  };

  const handleTurnChange = (value) => {
    setCurrentTurn(value);
  }

return(
  <div>
    <div className="bg-slate-500 w-96">
      <div>
        <p>Turn:</p>
        <label>
          <input
          type="radio"
          checked={currentTurn === 'w'}
          onChange={() => handleTurnChange('w')}
          />
          <span>White</span>
        </label>
        <label>
          <input 
          type="radio"
          checked={currentTurn === 'b'}
          onChange={() => handleTurnChange('b')}
          />
          <span>Black</span>
        </label>
      </div>
      <div>
        <p>Casteling:</p>
        <div className="flex">
          <p>White:</p>
          <button>King</button>
          <button>Queen</button>
        </div>
        <div className="flex">
          <p>Black:</p>
          <button>King</button>
          <button>Queen</button>
        </div>
      </div>
    </div>
    <div className="bg-slate-300">
      <div className="flex flex-col">
        <button>Play</button>
        <button onClick={() => clear()}>Clear</button>
        <button onClick={() => returnToInitialPosition()}>Initial Position</button>
      </div>
    </div>
  </div>
);
};

export default EditorSettings;
