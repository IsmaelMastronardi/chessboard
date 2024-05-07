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
    <div className="flex justify-between w-full">
    <button onClick={() => changeBoardState(-1)}>
      <img src="../../../images/arrow_left_gray.png" className="w-12" alt="previous"/>
    </button>
    <button onClick={() => changeBoardState(1)}>
    <img src="../../../images/arrow_right_gray.png" className="w-12" alt="next"/>
    </button>
  </div>
  );
};

export default BoardChanger;