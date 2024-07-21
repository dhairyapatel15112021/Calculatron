import React, { useState } from 'react';
import './App.css';
import sound from './Assets/archivo.mp3';
function App() {
  var [value, setvalue] = useState(['0']);
  var [flag, setflag] = useState(true);
  var [dot, setdot] = useState(true);
  var array = [{ grey: 'C' }, { grey: '+/-' }, { grey: '%' }, { orange: '/' }, { white: '7' }, { white: '8' },
  { white: '9' }, { orange: 'x' }, { white: '4' }, { white: '5' }, { white: '6' }, { orange: '-' }, { white: '3' },
  { white: '2' }, { white: '1' }, { orange: '+' }, { white: '0' }, { white: '.' }, { red: '=' }];
  function calculateanswer() {
    var i = 1, j = value;
    while (i < j.length) {
      if (!isNaN(j[i]) && !isNaN(j[i - 1])) {
        j[i - 1] = j[i - 1].concat(j[i]);
        j.splice(i, 1);
      }
      else if (j[i] === '.' && !isNaN(j[i - 1]) && !isNaN(j[i + 1])) {
        j[i - 1] = j[i - 1] + '.' + j[i + 1]
        j.splice(i, 2);
      }
      else {
        i++;
      }
    }
    i = 1;
    while (i < j.length) {
      if (j[i] === '%') {
        j[i - 1] = parseFloat(j[i - 1]) % parseFloat(j[i + 1]);
        j.splice(i, 2);
      }
      else {
        i = i + 2;
      }
    }
    i = 1;
    while (i < j.length) {
      if (j[i] === 'x' || j[i] === '/') {
        switch (j[i]) {
          case 'x':
            j[i - 1] = parseFloat(j[i - 1]) * parseFloat(j[i + 1]);
            break;

          case '/':
            j[i - 1] = parseFloat(j[i - 1]) / parseFloat(j[i + 1]);
            break;

          default:
            console.log("default case");
            break;
        }
        j.splice(i, 2);
      }
      else {
        i = i + 2;
      }
    }
    i = 1;
    while (i < j.length) {
      if (j[i] === '+' || j[i] === '-') {
        switch (j[i]) {
          case '+':
            j[i - 1] = parseFloat(j[i - 1]) + parseFloat(j[i + 1]);
            break;

          case '-':
            j[i - 1] = parseFloat(j[i - 1]) - parseFloat(j[i + 1]);
            break;

          default:
            console.log("default case");
            break;
        }
        j.splice(i, 2);
      }
      else {
        i = i + 2;
      }
    }
    return j[0];
  }
  function click(clickedvalue) {
    switch (clickedvalue) {
      case 'C':
        setvalue(['0']);
        setdot(true);
        setflag(true);
        break;

      case '=':
        var ans = calculateanswer();
        if (typeof ans === 'number' && ans !== undefined && ans !== null) {
          if ((ans.toFixed(2)).toString().length <= 10) {
            setvalue([(ans.toFixed(2)).toString()]);
          }
          else {
            setvalue(['Error']);
          }
        }
        break;

      case '+/-':
        if (value.length === 1) {
          setvalue([value[0] * -1])
        }
        break;

      case '+':
      case '-':
      case 'x':
      case '/':
      case '%':
        if (flag && value !== '0' && value.length <= 10) {
          setflag(false);
          setdot(true);
          setvalue([...value, clickedvalue]);
        }
        break;

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
      case '.':
        if (clickedvalue !== '.' && value.length <= 10) {
          setflag(true);
          setvalue([...value, clickedvalue]);
        }
        else {
          setflag(false);
          if (clickedvalue === '.' && dot && value.length <= 10) {
            setvalue([...value, clickedvalue]);
            setdot(false);
          }
        }
        break;

      default:
        console.log("default case");
        break;
    }
    const audio = new Audio(sound);
    audio.volume = 0.04;
    audio.play();
  }

  return (
    <div className="App">
      <div className='heading'>Calc</div>
      <div className='calc'>
        <div className='value'>{
          value.map((item, index) => {
            return (item)
          })
        }</div>
        <div className='calcbody'>
          {
            array.map((obj, index) => {
              return (<button onClick={() => click(Object.values(obj)[0])} className={Object.keys(obj)[0] + ' ' + 'btn' + Object.values(obj)[0]}>
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
