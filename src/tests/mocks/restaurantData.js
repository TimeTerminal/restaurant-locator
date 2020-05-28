import { RESTAURANTS_PER_PAGE } from '../../constants/index';

export const restaurantsData = Object.freeze({
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