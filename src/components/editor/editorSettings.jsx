import { useDispatch, useSelector } from "react-redux";
import { clearBoard, setToInitialPosition, updateCastling } from "../../redux/slices/boardEditorSlice";
import { useState } from "react";

const EditorSettings = () => {
  const {editorConvertedBoard, boardIsPlayable} = useSelector((store) => store.boardEditor)
  const dispatch = useDispatch();
  const [currentTurn, setCurrentTurn] = useState([editorConvertedBoard.turn]);
  const [castling, setCastling] = useState(editorConvertedBoard.castling.split(''));

  console.log(boardIsPlayable);
  const clear = () => {
    dispatch(clearBoard())
  }

  const returnToInitialPosition = () => {
    dispatch(setToInitialPosition())
  };

  const handleTurnChange = (value) => {
    setCurrentTurn(value);
  };

  const handleCastleRightsChange = (value, index) => {
    const newCastling = [...castling];
    if(newCastling[index] === ''){
      newCastling[index] = value;
    }
    else{
      newCastling[index] = '';
    }
    if(newCastling.join('') === ''){
      newCastling.push('-');
    };
    setCastling(newCastling);
    dispatch(updateCastling(newCastling.join('')));
  };

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
          <label>
            <input 
            type="checkbox"
            checked={editorConvertedBoard.castling.indexOf('K') !== -1}
            onChange={() => handleCastleRightsChange('K', 0)}
            />
            <span>King</span>
          </label>
          <label>
            <input 
            type="checkbox"
            checked={editorConvertedBoard.castling.indexOf('Q') !== -1}
            onChange={() => handleCastleRightsChange('Q', 1)}
            />
            <span>Queen</span>
          </label>
        </div>
        <div className="flex">
          <p>Black:</p>
          <label>
            <input 
            type="checkbox"
            checked={editorConvertedBoard.castling.indexOf('k') !== -1}
            onChange={() => handleCastleRightsChange('k', 2)}
            />
            <span>King</span>
          </label>
          <label>
            <input 
            type="checkbox"
            checked={editorConvertedBoard.castling.indexOf('q') !== -1}
            onChange={() => handleCastleRightsChange('q', 3)}
            />
            <span>Queen</span>
          </label>
        </div>
      </div>
    </div>
    <div className="bg-slate-300">
      <div className="flex flex-col">
        <button className={`${boardIsPlayable ? 'bg-green-500' : 'bg-red-500'}`}
        >Play</button>
        <button onClick={() => clear()}>Clear</button>
        <button onClick={() => returnToInitialPosition()}>Initial Position</button>
      </div>
    </div>
  </div>
);
};

export default EditorSettings;
