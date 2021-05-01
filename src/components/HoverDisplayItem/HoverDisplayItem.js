import React from 'react';
import './HoverDisplayItem.css';

const HoverDisplayItem = ({ row, col }) => {
  return (
    <div role='listitem' className='hoverDisplayItem'>
      { `row ${row} col ${col}` }
    </div>
  );
};

export default HoverDisplayItem;