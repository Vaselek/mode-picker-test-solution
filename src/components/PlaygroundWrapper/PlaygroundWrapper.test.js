import React from 'react';
import {render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import PlaygroundWrapper from './PlaygroundWrapper';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {get} from '../../api/httpRequests';

const responseData = {
  "easyMode": {
    "field": 5
  },
  "normalMode": {
    "field": 10
  },
  "hardMode": {
    "field": 15
  }
};

const server = setupServer(
  rest.get('https://some.org', (req, res, ctx) => {
    return res(
      ctx.json({ data: responseData })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('PlaygroundWrapper', () => {

  it('fetches field data', async () => {
    const response = await get();
    render(<PlaygroundWrapper />);
    expect(response.payload.data).toEqual(responseData);
  });

  it('changes cell color on hover', async () => {
    render(<PlaygroundWrapper />);
    await get();

    await waitFor(() => screen.getAllByRole('gridcell')[0]);
    const firstCellElement = screen.getAllByRole('gridcell')[0];
    expect(firstCellElement).toHaveClass('cell white');
    act(() => {
      fireEvent.mouseOver(firstCellElement);
    });
    expect(firstCellElement).toHaveClass('cell blue');
  });

  it('displays hovered cells', async () => {
    render(<PlaygroundWrapper />);
    await get();

    await waitFor(() => screen.getAllByRole('gridcell'));
    const firstCellElement = screen.getAllByRole('gridcell')[0];
    act(() => {
      fireEvent.mouseOver(firstCellElement);
    });
    await waitFor(() => screen.getByRole('listitem'));
    const newHoverDisplayItemElement = screen.getByRole('listitem');
    expect(newHoverDisplayItemElement).toHaveTextContent('row 1 col 1');
  });

  it('renders playground with default size of 25 cells on render', async () => {
    render(<PlaygroundWrapper />);
    await get();

    await waitFor(() => screen.getAllByRole('gridcell'));

    const cellElements = screen.getAllByRole('gridcell');
    expect(cellElements).toHaveLength(25);
  });


});



