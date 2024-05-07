import { useEffect } from "react";

const BoardChanger = ({ changeBoardState }) => {
  useEffect(() => {
    const handleArrowKey = (e) => {
      if(e.key === 'ArrowLeft'){
        changeBoardState(-1);
      }
      if(e.key === 'ArrowRight'){
        changeBoardState(1);
      }
    };
    document.addEventListener('keydown', handleArrowKey);
    return () => document.removeEventListener('keydown', handleArrowKey);
  });
  return (
    <div className="boardChanger">
    <button onClick={() => changeBoardState(-1)} className="">
      <img src="../../../images/arrow_left_purple.png" alt="previous"/>
    </button>
    <button onClick={() => changeBoardState(1)} className="">
    <img src="../../../images/arrow_right_purple.png"alt="next"/>
    </button>
  </div>
  );
};

export default BoardChanger;