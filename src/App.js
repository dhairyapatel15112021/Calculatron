import React, { useRef, useState } from 'react';
import './App.css';
import sound from './Assets/archivo.mp3';
import calculate from './calculation';

function App() {
  const [stack, setStack] = useState([]);
  const [isOperator, setIsOperator] = useState(false);
  const [isDot, setIsDot] = useState(false);
  const count = useRef(0);

  const array = [{ grey: 'C' }, { grey: '+/-' }, { grey: '%' }, { orange: '/' }, { white: '7' }, { white: '8' },
  { white: '9' }, { orange: 'x' }, { white: '4' }, { white: '5' }, { white: '6' }, { orange: '-' }, { white: '3' },
  { white: '2' }, { white: '1' }, { orange: '+' }, { white: '0' }, { white: '.' }, { red: '=' }];

  function checkCalculation(answer) {
    if (typeof answer !== "undefined" && answer !== "Error") {
      answer = answer.toString();
      if (answer.includes('.')) {
        answer = parseFloat(answer).toFixed(3).toString();
        setIsDot(true);
      }
      else {
        setIsDot(false);
      }
      count.current = answer.length;
      setIsOperator(false);
      setStack([answer]);
    }
    else {
      setIsDot(false);
      setIsOperator(false);
      setStack([0]);
    }
  }

  function handleCalculationResult(answer){
    if (typeof answer !== "undefined" && answer !== "Error") {
      answer = answer.toString();
      if (answer.includes(".")) {
        setIsDot(true);
        answer = parseFloat(answer).toFixed(3).toString();
      }
      else {
        setIsDot(false);
      }
      count.current = answer.length;
      setStack([answer]);
    }
    else {
      setStack([0]);
      setIsDot(false);
    }
    setIsOperator(false);
  }

  function click(clickedvalue) {
    if (clickedvalue === "C") {
      setStack([calculate.clearAnswer()]);
      count.current = 0;
      setIsDot(false);
      setIsOperator(false);
      return;
    }
    else if (clickedvalue === "=" && !isOperator) {
      let answer = calculate.calulation(stack);
      checkCalculation(answer);
      return;
    }
    else if ((stack.length === 0 && ['+/-', '+', '-', 'x', '/', '%', '.'].includes(clickedvalue)) ||
    count.current >= 9) {
      return;
    }
    else if (stack.length === 0) {
      setStack([clickedvalue]);
      return;
    }
    else if (clickedvalue === "+/-" && !isOperator) {
      let answer = calculate.negation(stack);
      handleCalculationResult(answer);
      return;
    }
    else if (clickedvalue === "%" && !isOperator) {
      let answer = calculate.percentage(stack);
      handleCalculationResult(answer);
      return;
    }
    switch (stack[stack.length - 1]) {
      case '+/-':
      case '+':
      case '-':
      case '/':
      case 'x':
      case '%':
        switch (clickedvalue) {
          case '0':
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9':
            setStack([...stack, clickedvalue]);
            setIsOperator(false);
            count.current = count.current + 1;
            break;

          default:
            console.log("Nothing to do");
        }
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
            setIsOperator(true);
            setIsDot(false);
            count.current = count.current + 1;
            break;

          default:
            if (clickedvalue === '.' && !isDot) {
              let newStack = [...stack];
              newStack[newStack.length - 1] = newStack[newStack.length - 1] + clickedvalue;
              setStack(newStack);
              setIsDot(true);
              count.current = count.current + 1;
            }
            else if (clickedvalue !== '.') {
              let newStack = [...stack];
              newStack[newStack.length - 1] = newStack[newStack.length - 1] + clickedvalue;
              setStack(newStack);
              count.current = count.current + 1;
            }
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
        <div className='value'>{stack.join("")}</div>
        <div className='calcbody'>
          {
            array.map((obj, index) => {
              return (<button key={index} onClick={() => click(Object.values(obj)[0])} className={`${Object.keys(obj)[0]} btn ${Object.values(obj)[0]}`}>
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
