import { useSelector } from "react-redux";

const ChessNotation = ({changeBoardState, boardStateIndex}) => {
  const {chessNotation} = useSelector((store) => store.gameBoard);
  if (chessNotation.length === 0){
    return null;
  };

  return(
    <div className="notationsContainer">
      {chessNotation.map((move, index) => (
        <button
        key={index}
        className={'notationBack'}
        onClick={() => changeBoardState(index + 1)}>
          <span className={`notationShadow ${boardStateIndex - 1 === index ? 'notationActiveShadow' : '' }`}>
           <div className={`notationFront ${boardStateIndex - 1 === index ? 'notationActiveFront' : '' }`}>{move}</div>
          </span>
        </button>
      ))}
    </div>
  );
};

export default ChessNotation;