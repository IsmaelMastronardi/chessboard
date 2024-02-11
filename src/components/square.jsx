import { useDrag, useDrop } from "react-dnd";
import { selectPieceIcon } from "../gameLogic.js/pieces";



const Square = ({value, isDark }) => {
  const bgColor = isDark ? 'bg-green-500' : 'bg-white';

  const [, drag] = useDrag({
    type: 'PIECE', // Specify a unique type for your draggable piece
    item: { value: value }, // Pass any additional data you want to associate with the dragged item
  });

  const [, drop] = useDrop({
    accept: 'PIECE', // Specify the type of draggable items that can be dropped
    drop: (item) => console.log(`Dropped piece with value ${item.value} onto Square with value ${value}`),
  });
  
  const piece = selectPieceIcon(value);
  return (
    <div className={`border border-gray-500 p-4 text-center ${bgColor}`} ref={drop} >
      <div className="w-12 h-12" ref={drag}>{piece}</div>
    </div>
  )
}

export default Square;