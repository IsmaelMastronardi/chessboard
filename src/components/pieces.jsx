import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { 
  faChessPawn as  faChessPawnSolid,
  faChessKnight as faChessKnightSolid,
  faChessBishop as faChessBishopSolid,
  faChessQueen as faChessQueenSolid,
  faChessKing as faChessKingSolid,
  faChessRook as faChessRookSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  faChessPawn,
  faChessKnight,
  faChessBishop,
  faChessQueen,
  faChessKing,
  faChessRook,
} from "@fortawesome/free-regular-svg-icons";

const Pieces = ({ value }) => {
  let result;

  const blackIcons = {
    'p': faChessPawnSolid,
    'r': faChessRookSolid,
    'n': faChessKnightSolid,
    'b': faChessBishopSolid,
    'q': faChessQueenSolid,
    'k': faChessKingSolid
  };

  const whiteIcons = {
    'P': faChessPawn,
    'R': faChessRook,
    'N': faChessKnight,
    'B': faChessBishop,
    'Q': faChessQueen,
    'K': faChessKing
  };

  const icon = value.toLowerCase() === value ? blackIcons[value] : whiteIcons[value];

  if (icon) {
    result = <FontAwesomeIcon icon={icon} className="w-full h-full chess-piece" style={{color: "",}}/>;
  } else {
    result = null;
  }

  return result;
};

export default Pieces;