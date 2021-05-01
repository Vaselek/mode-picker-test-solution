import React from 'react';
import { render } from '@testing-library/react';
import Cell from './Cell';
import fireEvent from "@testing-library/user-event";


describe('Cell', () => {

  it('renders cell', () => {
    const changeCellColor = jest.fn();
    const value = 0;
    const index = 1;
    const result = render(<Cell id={index} changeCellColor={changeCellColor} value={value} key={index}/>);
    const newCellElement = result.container.querySelector('.cell');
    expect(newCellElement).toBeInTheDocument();
  });

  it('renders cell colored blue if its value is 1', () => {
    const changeCellColor = jest.fn();
    const value = 1;
    const index = 1;
    const result = render(<Cell id={index} changeCellColor={changeCellColor} value={value} key={index}/>);
    const newCellElement = result.container.querySelector('.cell');
    expect(newCellElement).toHaveClass('cell blue');
  });

  it('renders cell colored white if its value is 1', () => {
    const changeCellColor = jest.fn();
    const value = 0;
    const index = 1;
    const result = render(<Cell id={index} changeCellColor={changeCellColor} value={value} key={index}/>);
    const newCellElement = result.container.querySelector('.cell');
    expect(newCellElement).toHaveClass('cell white');
  });

  it('calls handler on click', () => {
    const changeCellColor = jest.fn();
    const value = 0;
    const index = 1;
    const result = render(<Cell id={index} changeCellColor={changeCellColor} value={value} key={index}/>);
    const newCellElement = result.container.querySelector('.cell');
    fireEvent.click(newCellElement);
    expect(changeCellColor).toHaveBeenCalledTimes(1);
  });

});



