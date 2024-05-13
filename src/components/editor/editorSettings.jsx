import { useDispatch, useSelector } from "react-redux";
import { clearBoard, setToInitialPosition, updateCastling, updateTurn } from "../../redux/slices/boardEditorSlice";
import { useEffect, useState } from "react";

const EditorSettings = ({toggleMenu}) => {
  const {editorConvertedBoard} = useSelector((store) => store.boardEditor);
  const dispatch = useDispatch();
  const [currentTurn, setCurrentTurn] = useState(editorConvertedBoard.turn);
  const [castling, setCastling] = useState(['K', 'Q', 'k', 'q']);

  useEffect(() => {
    checkCastlingOnBoardChange();
  },[editorConvertedBoard])

  const replaceAt = (array, index) => {
    const newArray = [...array];
    newArray[index] = '';
    return newArray;
  };

  const checkCastlingOnBoardChange = () => {
    let newCastling = [...castling];
    if (editorConvertedBoard.pieces[0][4] !== 'k') {
        newCastling = replaceAt(newCastling, 2);
        newCastling = replaceAt(newCastling, 3);
    }
    if (editorConvertedBoard.pieces[0][0] !== 'r') {
        newCastling = replaceAt(newCastling, 3);
    }
    if (editorConvertedBoard.pieces[0][7] !== 'r') {
        newCastling = replaceAt(newCastling, 2);
    }
    if (editorConvertedBoard.pieces[7][4] !== 'K') {
        newCastling = replaceAt(newCastling, 0);
        newCastling = replaceAt(newCastling, 1);
    }
    if (editorConvertedBoard.pieces[7][0] !== 'R') {
        newCastling = replaceAt(newCastling, 1);
    }
    if (editorConvertedBoard.pieces[7][7] !== 'R') {
        newCastling = replaceAt(newCastling, 0);
    }
    setCastling(newCastling);
    dispatch(updateCastling(newCastling.join('')));
};

  const clear = () => {
    dispatch(clearBoard())
  }

  const returnToInitialPosition = () => {
    dispatch(setToInitialPosition())
  };

  const handleTurnChange = (value) => {
    setCurrentTurn(value);
    updateTurn(value);
    console.log(currentTurn)
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
  <div className="holder">
    <div className="">
      <div className="buttonGroup">
        <span className="buttonShadow straightBottomBorder">
          <p className="buttonFront straightBottomBorder groupBottomFront">Turn:</p>
        </span>
        <div className="flex justify-between">
          <button className="buttonBack boxFullWH" onClick={() => handleTurnChange('w')}>
            <span className={`buttonShadow straightTopBorder ${currentTurn === 'w' ? 'blockButtonActive' : ''}`}>
              <span
              className={`buttonFront straightTopBorder ${currentTurn === 'w' ? 'blockButtonActive' : ''}`}>White</span> 
            </span>
          </button>
          <button className="buttonBack boxFullWH" onClick={() => handleTurnChange('b')}>
            <span className={`buttonShadow straightTopBorder ${currentTurn === 'b' ? 'blockButtonActive' : ''}`}>
              <span className={`buttonFront straightTopBorder ${currentTurn === 'b' ? 'blockButtonActive' : ''}`}>Black</span> 
            </span>
          </button>
        </div>
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
    <div className="">
      <div className="flex flex-col">
        <button onClick={() => clear()}>Clear</button>
        <button onClick={() => returnToInitialPosition()}>Initial Position</button>
      </div>
    </div>
  </div>
);
};

export default EditorSettings;
