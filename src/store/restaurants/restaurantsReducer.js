import {
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTAURANTS_FAILURE
} from '../../constants/actionTypes';
import { ERRORS } from '../../constants';

const initialState = {
  entities: {
    total: null,
    perPage: null,
    allRestaurants: [],
    currPageRestaurants: []
  },
  status: null,
  error: null
};

export default function restaurants(state = initialState, action) {
  switch (action.type) {
    case FETCH_RESTAURANTS_REQUEST:
      return {
        ...state,
        status: action.type
      }
    case FETCH_RESTAURANTS_SUCCESS:
      const { total_entries, per_page, restaurants } = action.data;
      const error = restaurants.length ? null : ERRORS.NO_CONTENT;

      return {
        ...state,
        entities: {
          total: total_entries,
          perPage: per_page,
          allRestaurants: restaurants
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