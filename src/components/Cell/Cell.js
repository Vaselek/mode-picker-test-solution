import React from 'react';
import './Cell.css';

const Cell = ({ id, value, changeCellColor }) => {

  let color = value === 0 ? 'white' : 'blue';

  return (
      <div role='gridcell' onMouseEnter={()=>changeCellColor(id)} className={`cell ${color}`} id={id} ></div>
  );
};

export default Cell;