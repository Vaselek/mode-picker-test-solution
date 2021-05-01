import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import ModePicker from './ModePicker';

describe('ModePicker', () => {

  it('renders ModePicker', () => {
    const optionsNumber = 4;
    const handleFormSubmit = jest.fn();
    render(<ModePicker handleFormSubmit={handleFormSubmit}/>);
    const select  = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    const selectOptions = screen.getAllByRole('option');
    expect(selectOptions).toHaveLength(optionsNumber);
  });

  it('let select mode option', () => {
    let secondOptionValue = 'easyMode';
    const handleFormSubmit = jest.fn();
    render(<ModePicker handleFormSubmit={handleFormSubmit}/>);
    const select  = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: secondOptionValue }});
    const selectOptions = screen.getAllByRole('option');
    expect(selectOptions[0].selected).toBeFalsy();
    expect(selectOptions[1].selected).toBeTruthy();
    expect(selectOptions[2].selected).toBeFalsy();
  });

  it('calls handleFormSubmit on button click', () => {
    let secondOptionValue = 'easyMode';
    const handleFormSubmit = jest.fn();
    render(<ModePicker handleFormSubmit={handleFormSubmit}/>);
    const select  = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: secondOptionValue }});
    fireEvent.click(screen.getByRole('button'));
    expect(handleFormSubmit).toBeCalled();
  });

});



