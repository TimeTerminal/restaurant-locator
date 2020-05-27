import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Home from './Component';
import { renderWithStore } from '../../tests/renderWithStore';
import { ERRORS, RESTAURANTS_PER_PAGE } from '../../constants/index';
import {
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS,
  FILTER_RESTAURANTS_REQUEST,
  FILTER_RESTAURANTS_COMPLETE
} from '../../constants/actionTypes';

const restaurants = ({
  currentPage: 1,
  entities: {
    allRestaurants: [],
    currentPageRestaurants: [],
    filteredRestaurants: [],
    total: null,
  },
  error: null,
  perPage: RESTAURANTS_PER_PAGE,
  status: 'initialState'
});

const fetchRestaurants = () => { };

describe("Home", () => {
  afterEach(cleanup);

  it("Renders", () => {
    renderWithStore(
      <Home restaurants={restaurants} fetchRestaurants={fetchRestaurants} />
    );
  })
});