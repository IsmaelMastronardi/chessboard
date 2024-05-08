import { useSelector } from "react-redux";

const ChessNotation = ({changeBoardState, boardStateIndex}) => {
  const {chessNotation} = useSelector((store) => store.gameBoard);
  console.log(boardStateIndex);
  if (chessNotation.length === 0){
    return null;
  };
  return(
    <div className="notationsContainer">
      {chessNotation.map((move, index) => (
        <p 
        key={index}
        className={`notation ${boardStateIndex - 1 === index ? 'notationActive' : '' }`}
        onClick={() => changeBoardState(index + 1)}>
         {move}
        </p>
      ))}
    </div>
  );
};

export default ChessNotation;