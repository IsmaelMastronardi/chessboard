import { useEffect } from "react";

const BoardChanger = ({ changeBoardState, boardStateIndex }) => {
  useEffect(() => {
    const handleArrowKey = (e) => {
      if(e.key === 'ArrowLeft'){
        changeBoardState( boardStateIndex -1);
      }
      if(e.key === 'ArrowRight'){
        changeBoardState(boardStateIndex + 1);
      }
    };
    document.addEventListener('keydown', handleArrowKey);
    return () => document.removeEventListener('keydown', handleArrowKey);
  });
  return (
    <div className="boardChanger holder">
    <button onClick={() => changeBoardState(boardStateIndex -1)} className="buttonBack buttonBack2">
      <span className="buttonShadow buttonShadow2">
        <span className="px-4 py-2 buttonFront buttonFrontWithHover">
          <img src="../../../images/arrow_left_purple.png" alt="previous"/>
        </span>
      </span>
    </button>
    <button onClick={() => changeBoardState(boardStateIndex +1)} className="buttonBack buttonBack2">
      <span className="buttonShadow buttonShadow2">
        <span className="px-4 py-2 buttonFront buttonFrontWithHover">
          <img src="../../../images/arrow_right_purple.png"alt="next"/>
        </span>
      </span>
    </button>
  </div>
  );
};

export default BoardChanger;