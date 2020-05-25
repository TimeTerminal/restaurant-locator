import { ERRORS } from '../../constants';
import {
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTAURANTS_FAILURE
} from '../../constants/actionTypes';

const initialState = {
  entities: {
    total: null,
    perPage: null,
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

      return {
        ...state,
        entities: {
          total: total_entries,
          perPage: per_page,
          currPageRestaurants: restaurants,
        },
        status: action.type,
        error: null
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