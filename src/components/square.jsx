import { selectPieceIcon } from "../gameLogic.js/pieces";



const Square = ({value, isDark }) => {
  const bgColor = isDark ? 'bg-green-500' : 'bg-white';
  const piece = selectPieceIcon(value)
  return (
    <div className={`border border-gray-500 p-4 text-center ${bgColor}`}>
      <div className="w-12 h-12">{piece}</div>
    </div>
  )
}

export default Square;