import React, { useState } from 'react';
import './App.css';
import sound from './Assets/archivo.mp3';
import claculate from './calculation';
function App() {
  const [stack, setStack] = useState([]);
  const array = [{ grey: 'C' }, { grey: '+/-' }, { grey: '%' }, { orange: '/' }, { white: '7' }, { white: '8' },
  { white: '9' }, { orange: 'x' }, { white: '4' }, { white: '5' }, { white: '6' }, { orange: '-' }, { white: '3' },
  { white: '2' }, { white: '1' }, { orange: '+' }, { white: '0' }, { white: '.' }, { red: '=' }];
  function click(clickedvalue) {
    if (stack.length === 0 && (clickedvalue === '+/-' || clickedvalue === '+' || clickedvalue === '-' || clickedvalue === 'x' || clickedvalue === '/' ||
      clickedvalue === '%' || clickedvalue === '.')) {
      return;
    }
    else if (stack.length === 0) {
      setStack([clickedvalue]);
      return;
    }
    else if (clickedvalue === "=") {
      const answer = claculate.calulation(stack);
      setStack([answer]);
      return;
    }
    else if (clickedvalue === "+/-"){
      setStack([claculate.negation(stack)]);
      return;
    }
    else if (clickedvalue === "C"){
      setStack([claculate.clearAnswer()]);
      return;
    }
    else if (clickedvalue === "%"){
      setStack([claculate.percentage(stack)]);
      return;
    }
    switch (stack[stack.length - 1]) {
      case '+/-':
      case '+':
      case '-':
      case '/':
      case 'x':
      case '%':
        setStack([...stack, clickedvalue]);
        break;

      default:
        switch (clickedvalue) {
          case '+/-':
          case '+':
          case '-':
          case '/':
          case 'x':
          case '%':
            setStack([...stack, clickedvalue]);
            break;

          default:
            let newStack = [...stack];
            newStack[newStack.length - 1] = newStack[newStack.length - 1] + clickedvalue;
            setStack(newStack);
            break;
        }
        break;
    }
    const audio = new Audio(sound);
    audio.volume = 0.04;
    audio.play();
  }

  return (
    <div className="App">
      <div className='heading'>Calculatron</div>
      <div className='calc'>
        <div className='value'>{
          stack.map((item, index) => {
            return (item)
          })
        }</div>
        <div className='calcbody'>
          {
            array.map((obj, index) => {
              return (<button onClick={() => click(Object.values(obj)[0])} className={`${Object.keys(obj)[0]} btn ${Object.values(obj)[0]}`}>
                {Object.values(obj)[0]}
              </button>)
            })
          }
        </div>
      </div>

    </div>
  );
}
export default App;
