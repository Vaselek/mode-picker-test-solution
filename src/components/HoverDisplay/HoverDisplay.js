import React from 'react';
import HoverDisplayItem from "../HoverDisplayItem/HoverDisplayItem";
import './HoverDisplay.css';

const HoverDisplay = ({ hoveredCells, field }) => {

  const getRowAndCol = (cellInfo, field) => {
    const row = Math.ceil((cellInfo.id + 1)/field);
    const col = (cellInfo.id+1)%field === 0 ? field : (cellInfo.id+1)%field;
    return {uniqueId: cellInfo.uniqueId, row: row, col: col};
  };

  let hoverItems = hoveredCells.map(cellInfo => getRowAndCol(cellInfo, field)).reverse().map((item) => <HoverDisplayItem key={item.uniqueId} row={item.row} col={item.col} />);

  return (
    <div className='hoverDisplay'>
      <h3>Hover Squares</h3>
      { hoverItems }
    </div>
  );
};

export default HoverDisplay;