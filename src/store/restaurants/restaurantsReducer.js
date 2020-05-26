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
  DATA_LOADING,
  DATA_LOADED,
  RESTAURANTS_PER_PAGE
} from '../../constants';

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
  status: null
};

export default function restaurants(state = initialState, action) {
  switch (action.type) {
    // Initial fetch call
    case FETCH_RESTAURANTS_REQUEST: {
      return {
        ...state,
        status: DATA_LOADING
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

      return {
        ...state,
        entities: {
          ...state.entities,
          allRestaurants: formattedRestaurantsList,
          currentPageRestaurants,
          total: restaurants.length,
        },
        status: DATA_LOADED,
        error
      }
    }
    case FETCH_RESTAURANTS_FAILURE: {
      return {
        ...state,
        status: DATA_LOADED,
        error: action.error
      }
    }

    case FILTER_RESTAURANTS_REQUEST: {
      console.log("FILTER_RESTAURANTS_REQUEST state: ", state);
      return {
        ...state,
        status: DATA_LOADING
      }
    }

    case FILTER_RESTAURANTS_COMPLETE: {
      return {
        ...state,
        status: DATA_LOADED
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