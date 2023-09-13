import React from 'react';
import './App.css';
import BoardSpace from './modules/space';
const completeArr = [];
// const a = 'a';
// const valueOfA = a.charCodeAt(0) - 96;
// const letterArr = [];
// for(let i =8 ;i> 0;i--) {
//   letterArr.push(String.fromCharCode(i+64))
// }

for(let i =8 ;i> 0;i--) {
 for(let x = 1; x<9; x++) {
  completeArr.push({[i] : i + String.fromCharCode(x + 64)})
 }
}
const App = () => {
  return(
    <section className='board'> 
      {completeArr.map((el) => <BoardSpace key={Object.values(el)} space={Object.values(el)} />)}
    </section>
  )
};


export default App;
