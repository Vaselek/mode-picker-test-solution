import React from 'react';
import { render, screen } from '@testing-library/react';
import HoverDisplayItem from './HoverDisplayItem';


describe('HoverDisplayItem', () => {

  it('renders HoverDisplayItem', () => {
    const item = {
      uniqueId: 1,
      row: 1,
      col: 1
    };
    render(<HoverDisplayItem key={item.uniqueId} row={item.row} col={item.col} />);
    const newHoverDisplayItemElement = screen.getByRole('listitem');
    expect(newHoverDisplayItemElement).toBeInTheDocument();
  });

});



