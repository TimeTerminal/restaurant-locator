import {
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTAURANTS_FAILURE
} from '../../constants/actionTypes';
import { ERRORS, RESTAURANTS_PER_PAGE } from '../../constants';

const initialState = {
  currentPage: 1,
  entities: {
    total: null,
    allRestaurants: [],
    filteredRestaurants: [],
  },
  error: null,
  perPage: RESTAURANTS_PER_PAGE,
  status: null
};

export default function restaurants(state = initialState, action) {
  switch (action.type) {
    case FETCH_RESTAURANTS_REQUEST:
      return {
        ...state,
        status: action.type
      }
    case FETCH_RESTAURANTS_SUCCESS:
      const { per_page, restaurants } = action.data;
      const error = restaurants.length ? null : ERRORS.NO_CONTENT;

      const filteredRestaurants = restaurants.slice(0, RESTAURANTS_PER_PAGE);

      return {
        ...state,
        entities: {
          total: restaurants.length,
          allRestaurants: restaurants,
          filteredRestaurants,
        },
        status: action.type,
        error
      }
    case FETCH_RESTAURANTS_FAILURE:
      return {
        ...state,
        status: action.type,
        error: action.error
      }
    default:
      return state;
  }
};