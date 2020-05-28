import React from 'react';
import {
  cleanup,
  fireEvent,
  screen
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Pagination from './Component';
import { renderWithStore } from '../../tests/renderWithStore';
import { paginationFixture } from '../../tests/fixtures';
import { UPDATE_PAGE } from '../../constants/actionTypes';

const mockUpdatePageAction = {
  type: UPDATE_PAGE,
  page: 2
}

const updatepage = jest.fn();

describe("Pagination", () => {
  afterEach(cleanup);

  it("renders 3 tabs for 75 results", () => {
    renderWithStore(
      <Pagination
        currentPage={paginationFixture.currentPage}
        perPage={paginationFixture.perPage}
        total={paginationFixture.total}
        updatepage={updatepage}
      />
    );

    expect(screen.getByTestId('pagination_list').children.length).toBe(3);
  });

  it("updates the current page correctly", () => {
    const { store } = renderWithStore(
      <Pagination
        currentPage={paginationFixture.currentPage}
        perPage={paginationFixture.perPage}
        total={paginationFixture.total}
        updatepage={updatepage}
      />
    );

    store.dispatch(mockUpdatePageAction);

    const list = screen.getByTestId('pagination_list');
    fireEvent.click(list.children[2]);
    expect(store.getState().restaurants.currentPage).toBe(2);

  });
});