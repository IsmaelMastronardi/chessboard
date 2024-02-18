import { myBoard } from "../chessBoard";
import Square from "./square";

const Board = () => {
  return(
    <section className="flex flex-col items-center gap-10">
      <p>board</p>
      <div className="grid grid-cols-8">
      {myBoard.board.map((square, index) => {
        const row = Math.floor(index / 8);
        const col = index % 8;
        const isDark = (row + col) % 2 === 1;

        return (
          <div key={index} className="col-span-1">
            <Square value={square} isDark={isDark} index={index}/>
          </div>
        );
      })}
    </div>
    </section>
  )
}

export default Board;