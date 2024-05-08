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
    <div className="boardChanger">
    <button onClick={() => changeBoardState(boardStateIndex -1)} className="">
      <img src="../../../images/arrow_left_purple.png" alt="previous"/>
    </button>
    <button onClick={() => changeBoardState(boardStateIndex +1)} className="">
    <img src="../../../images/arrow_right_purple.png"alt="next"/>
    </button>
  </div>
  );
};

export default BoardChanger;