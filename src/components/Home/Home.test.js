import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Home from './Component';
import { renderWithStore } from '../../tests/renderWithStore';
import { restaurantsData } from '../../tests/mocks/restaurantData';
import { ERRORS } from '../../constants/index';
import {
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS,
  FILTER_RESTAURANTS_REQUEST,
  FILTER_RESTAURANTS_COMPLETE
} from '../../constants/actionTypes';

const fetchRestaurants = jest.fn(x => {
  console.log('x :>> ', x);
});

describe("Home", () => {
  afterEach(cleanup);

  it("Renders with store hooked up with initial state", () => {
    renderWithStore(
      <Home
        restaurants={restaurantsData}
        fetchRestaurants={fetchRestaurants}
      />
    );
  });
    );
  })
});