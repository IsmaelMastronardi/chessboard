import { useSelector } from "react-redux";

const PositionIndicator = ({ row, col }) => {
  const {playerColor} = useSelector((store) => store.settings);
  if(playerColor === 'white'){
    return (
      <>
        {col === 0 && (
          <div className="absolute top-0 left-0 text-xs font-bold">
            {Math.abs(row - 7) + 1}
          </div>
        )}
        {row === 7 && (
          <div className="absolute bottom-0 right-0 text-xs font-bold">
            {String.fromCharCode(65 + col)}
          </div>
        )}
      </>
    );
  }
  return (
    <>
      {col === 7 && (
        <div className="absolute top-0 left-0 text-xs font-bold">
          {Math.abs(row - 7) + 1}
        </div>
      )}
      {row === 0 && (
        <div className="absolute bottom-0 right-0 text-xs font-bold">
          {String.fromCharCode(65 + col)}
        </div>
      )}
    </>
  );
};

export default PositionIndicator;