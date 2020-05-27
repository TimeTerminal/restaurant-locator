import {
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTAURANTS_FAILURE,
  FILTER_RESTAURANTS_REQUEST,
  FILTER_RESTAURANTS_COMPLETE,
  UPDATE_PAGE
} from '../../constants/actionTypes';
import {
  ERRORS,
  RESTAURANTS_PER_PAGE
} from '../../constants';

import { stringComparator } from '../helpers';

const initialState = {
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
};

export default function restaurants(state = initialState, action) {
  switch (action.type) {
    // Initial fetch call
    case FETCH_RESTAURANTS_REQUEST: {
      return {
        ...state,
        status: action.type
      }
    }
    case FETCH_RESTAURANTS_SUCCESS: {
      const { restaurants } = action.data;
      const error = restaurants.length ? null : ERRORS.NO_CONTENT;

      const formattedRestaurantsList = restaurants.map(restaurant => {
        // Filter restaurant object to only store entries with relevant information through an anonymous function
        const filteredRestaurantEntity = (({ address, area, id, image_url, name, phone, price }) => ({ address, area, id, image_url, name, phone, price }))(restaurant);

        return filteredRestaurantEntity;
      });

      const currentPageRestaurants = formattedRestaurantsList.slice(0, RESTAURANTS_PER_PAGE);
      const filteredRestaurants = [...formattedRestaurantsList];

      return {
        ...state,
        entities: {
          ...state.entities,
          allRestaurants: formattedRestaurantsList,
          currentPageRestaurants,
          filteredRestaurants,
          total: restaurants.length,
        },
        status: action.type,
        error
      }
    }
    case FETCH_RESTAURANTS_FAILURE: {
      return {
        ...state,
        status: action.type,
        error: action.error
      }
    }

    case FILTER_RESTAURANTS_REQUEST: {
      const filteredRestaurants = state.entities.allRestaurants.filter(restaurant => {
        const { name, address, area } = restaurant;

        const nameComparison = stringComparator(name, action.filter);
        let addressComparison, areaComparison;

        if (nameComparison === false) {
          addressComparison = stringComparator(address, action.filter);
        }

        if (addressComparison === false) {
          areaComparison = stringComparator(area, action.filter);
        }

        if (nameComparison || addressComparison || areaComparison) {
          return true;
        }
      });

      const currentPageRestaurants = filteredRestaurants.slice(0, RESTAURANTS_PER_PAGE);

      return {
        ...state,
        currentPage: 1,
        entities: {
          ...state.entities,
          currentPageRestaurants,
          filteredRestaurants,
          total: filteredRestaurants.length,
        },
        status: action.type,
      }
    }

    case FILTER_RESTAURANTS_COMPLETE: {
      return {
        ...state,
        status: action.type
      }
    }

    case UPDATE_PAGE: {
      const start = (action.page - 1) * RESTAURANTS_PER_PAGE;
      const end = start + RESTAURANTS_PER_PAGE;

      const currentPageRestaurants = state.entities.allRestaurants.slice(start, end);

      return {
        ...state,
        currentPage: action.page,
        entities: {
          ...state.entities,
          currentPageRestaurants
        }
      }
    }
    default:
      return state;
  }
};