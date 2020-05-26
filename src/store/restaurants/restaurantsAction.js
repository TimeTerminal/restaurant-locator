import restaurantsService from '../../services/restaurants';
import { ERRORS } from '../../constants';
import {
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTAURANTS_FAILURE,
  FILTER_RESTAURANTS,
  UPDATE_PAGE
} from '../../constants/actionTypes';

const fetchRestaurants = async (dispatch, restaurantsService, url) => {
  dispatch({ type: FETCH_RESTAURANTS_REQUEST });

  try {
    const response = await restaurantsService.getRestaurantsFromApi(url);

    dispatch({
      type: FETCH_RESTAURANTS_SUCCESS,
      data: response.data
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      dispatch({
        type: FETCH_RESTAURANTS_FAILURE,
        error: ERRORS.BAD_REQUEST
      });
    }
  }
};

export const filterRestaurants = (dispatch, filterQuery) => {
  dispatch({
    type: FILTER_RESTAURANTS,
    filter: filterQuery
  });
};

export const updatePage = (dispatch, page) => {
  dispatch({
    type: UPDATE_PAGE,
    page
  });
};

export const fetchRestaurantsInjector = dispatch => {
  return url => {
    fetchRestaurants(dispatch, restaurantsService, url);
  };
};