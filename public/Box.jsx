import React, { useState, useRef } from 'react';
import './App.css';


function Create({ value, onClick }) {
  return (
    <button type="button" id={`box-${value}`} value={value} onClick={onClick}>
      {value}
    </button>
  );
}

function Box() {
  const [cells, setCells] = useState(Array(9).fill(''));
  const turnref = useRef('X'); 
  const winningCombinations = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
  ];

  const checkwinner = () => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a]; 
      }
    }
    return null;
  };

  const handlereset = () => {
    setCells(Array(9).fill(''));
    turnref.current = 'X';
  };

  const handleclick = (index) => {
    if (cells[index] === '') { 
      const newcells = [...cells];
      newcells[index] = turnref.current;
      setCells(newcells);

      const winner = checkwinner();
      if (winner) {
        console.log(`Player ${winner} wins!`);
        alert(`Player ${winner} wins!`); 
        window.location.reload();
        return; 
      }

      
    
      turnref.current = turnref.current === 'X' ? 'O' : 'X';
    }
  };

  const isdraw = () => {
    return cells.every((cell) => cell !== '');
  };

  const renderstatus = () => {
    const winner = checkwinner();
    if (winner) {
      return `Player ${winner} wins!`;
    } else if (isdraw()) {
      return 'Tie game!';
    } else {
      return `Current player: ${turnref.current}`;
    }
  };

  return (
    <div id="totalbox">
      {cells.map((cellValue, index) => (
        <Create key={index} value={cellValue} onClick={() => handleclick(index)} />
      ))}
      <button onClick={handlereset}>Reset Game</button>
      <p>{renderstatus()}</p>
    </div>
  );
}

export default Box;
