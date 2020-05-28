import React from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Home from './Component';
import { renderWithStore } from '../../tests/renderWithStore';
import { restaurantsData } from '../../tests/mocks/restaurantData';
import { restaurants } from '../../tests/fixtures/restaurants';
import { ERRORS } from '../../constants/index';
import {
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS,
  FILTER_RESTAURANTS_REQUEST,
  FILTER_RESTAURANTS_COMPLETE
} from '../../constants/actionTypes';

const mockFetchRestaurantsSuccessAction = {
  type: FETCH_RESTAURANTS_SUCCESS,
  data: restaurants
}

describe("Home", () => {
const fetchRestaurantsMock = jest.fn();

describe("Home and Main", () => {
  afterEach(cleanup);

  it("renders with store hooked up with initial state", () => {
    renderWithStore(
      <Home
        restaurants={restaurantsData}
        fetchRestaurants={fetchRestaurantsMock}
      />
    );
  });

  it("fetches restaurants information correctly", () => {
    const { store } = renderWithStore(
      <Home
        restaurants={restaurantsData}
        fetchRestaurants={fetchRestaurantsMock}
      />
    );

    fireEvent.change(
      screen.getByTestId('city-search-input'),
      { target: { value: 'new york' } }
    );

    fireEvent.click(screen.getByTestId('city-search-submit-button'));
    expect(fetchRestaurantsMock.mock.calls.length).toBe(1);

    store.dispatch(mockFetchRestaurantsSuccessAction);

    const storeData = store.getState().restaurants;
    expect(storeData.entities.total).toEqual(26);
  });
});