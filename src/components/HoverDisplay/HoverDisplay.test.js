import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import HoverDisplay from './HoverDisplay';


describe('HoverDisplay', () => {

  it('renders HoverDisplay', () => {
    const hoveredCells = [
      {
        index: 23,
        uniqueId: 123
      }
    ];
    const fields = [5, 10, 15];
    const expectedColsAndRows = { 5: {col: 4, row: 5}, 10: {col: 4, row: 3}, 15: {col: 9, row: 2}};

    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      render(<HoverDisplay hoveredCells={hoveredCells} field={field}/>);
      const hoverDisplayItemElement = screen.getByRole('listitem');
      expect(hoverDisplayItemElement).toHaveTextContent(`row ${expectedColsAndRows[field].row} col ${expectedColsAndRows[field].col}`);
      cleanup();
    }
  });

});



