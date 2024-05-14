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
    dispatch(updateTurn(value));
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
    <div>
      <div>
        <span className="buttonShadow straightBottomBorder">
          <p className="buttonFront straightBottomBorder groupBottomFront">Turn:</p>
        </span>
        <div className="flex">
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
        <span className="mt-10 buttonShadow straightBottomBorder">
          <p className="buttonFront straightBottomBorder groupBottomFront">Casteling:</p>
        </span>

        <div className="flex justify-between">
         <span className="buttonBack boxFullWH">
            <span className={`buttonShadow straightTopBorder`}>
              <span
              className={`buttonFront straightTopBorder groupBottomFront`}>White:</span> 
            </span>
          </span>
          <button className="buttonBack boxFullWH" onClick={() => handleCastleRightsChange('K', 0)}>
            <span className={`buttonShadow straightTopBorder ${editorConvertedBoard.castling.indexOf('K') !== -1 ? 'blockButtonActive' : ''}`}>
              <span
              className={`buttonFront straightTopBorder ${editorConvertedBoard.castling.indexOf('K') !== -1 ? 'blockButtonActive' : ''}`}>King</span> 
            </span>
          </button>
          <button className="buttonBack boxFullWH" onClick={() => handleCastleRightsChange('Q', 1)}>
            <span className={`buttonShadow straightTopBorder ${editorConvertedBoard.castling.indexOf('Q') !== -1 ? 'blockButtonActive' : ''}`}>
              <span className={`buttonFront straightTopBorder ${editorConvertedBoard.castling.indexOf('Q') !== -1 ? 'blockButtonActive' : ''}`}>Queen</span> 
            </span>
          </button>
        </div>

        <div className="flex justify-between">
         <span className="buttonBack boxFullWH">
            <span className={`buttonShadow straightTopBorder`}>
              <span
              className={`buttonFront straightTopBorder`}>Black:</span> 
            </span>
          </span>
          <button className="buttonBack boxFullWH" onClick={() => handleCastleRightsChange('k', 2)}>
            <span className={`buttonShadow straightTopBorder ${editorConvertedBoard.castling.indexOf('k') !== -1 ? 'blockButtonActive' : ''}`}>
              <span
              className={`buttonFront straightTopBorder ${editorConvertedBoard.castling.indexOf('k') !== -1 ? 'blockButtonActive' : ''}`}>King</span> 
            </span>
          </button>
          <button className="buttonBack boxFullWH" onClick={() => handleCastleRightsChange('q', 3)}>
            <span className={`buttonShadow straightTopBorder ${editorConvertedBoard.castling.indexOf('q') !== -1 ? 'blockButtonActive' : ''}`}>
              <span className={`buttonFront straightTopBorder ${editorConvertedBoard.castling.indexOf('q') !== -1 ? 'blockButtonActive' : ''}`}>Queen</span> 
            </span>
          </button>
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
