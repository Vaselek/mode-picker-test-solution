import React from 'react';
import HoverDisplayItem from "../HoverDisplayItem/HoverDisplayItem";
import './HoverDisplay.css';

const HoverDisplay = ({ hoveredCells, field }) => {

  const getRowAndCol = (cellId, field) => {
    const row = Math.ceil((cellId + 1)/field);
    const col = (cellId+1)%field === 0 ? field : (cellId+1)%field;
    return {row: row, col: col};
  };

  let hoverItems = hoveredCells.map((cellId) => getRowAndCol(cellId, field)).reverse().map((item) => <HoverDisplayItem row={item.row} col={item.col} />);

  return (
    <div className='hoverDisplay'>
      <h3>Hover Squares</h3>
      { hoverItems }
    </div>
  );
};

export default HoverDisplay;