import React from 'react';
import Cell from "../Cell/Cell";
import './Playground.css';

const Playground = ({ field, cells, changeCellColor }) => {

  let playgroundCells = cells.map((cell, index) =>
    <Cell id={index} changeCellColor={changeCellColor} value={cell} key={index}/>
  );

  return (
    <div className={`playground cols-${field}`}>
      { playgroundCells }
    </div>
  );
};

export default Playground;