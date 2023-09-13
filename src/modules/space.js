import { type } from "@testing-library/user-event/dist/type";

const BoardSpace = ({space}) => {
  const num = space[0].substring(0,1);
  const letterValue = space[0].charCodeAt(1) - 64;
  let className = "space spaceWhite";
  if((num % 2 !== 0 && letterValue % 2 === 0) || (num % 2 === 0 && letterValue % 2 !== 0)) {
    className = "space spaceBlack"
  }
  return(
    <div className={className}>
      <p className="innerSpace">
        {space}
      </p>
    </div>
  )
}


export default BoardSpace;