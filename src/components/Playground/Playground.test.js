import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Playground from './Playground';


describe('Playground', () => {

  it('renders playground with number of rendered cells equal to cells', () => {
    const fields = [5, 10, 15];

    for (let i = 0; i < fields.length; i++) {
      const changeCellColor = jest.fn();
      let field = fields[i];
      const cells = new Array(field*field).fill(0);
      render(<Playground field={field} changeCellColor={changeCellColor} cells={cells} />);
      const cellElements = screen.getAllByRole('gridcell');
      expect(cellElements).toHaveLength(cells.length);
      cleanup();
    }
  });

  it('renders playground with number of columns equal to field size', () => {
    const fields = [5, 10, 15];

    for (let i = 0; i < fields.length; i++) {
      const changeCellColor = jest.fn();
      let field = fields[i];
      const cells = new Array(field*field).fill(0);
      const result = render(<Playground field={field} changeCellColor={changeCellColor} cells={cells} />);
      const newCellElement = result.container.querySelector('.playground');
      expect(newCellElement).toHaveClass(`playground cols-${field}`);
      cleanup();
    }
  });

});



