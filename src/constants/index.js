const API_URL = 'https://opentable.herokuapp.com/api/';
const DATA_LOADING = 'loading initiated';
const DATA_LOADED = 'loading complete';
const RESTAURANTS = 'restaurants';
const RESTAURANTS_PER_PAGE = 25;

// Errors
const ERRORS = {
  BAD_REQUEST: 'Bad Request',
  NOT_FOUND: 'Not Found',
  NO_CONTENT: 'No Content'
}

module.exports = {
  API_URL,
  DATA_LOADING,
  DATA_LOADED,
  RESTAURANTS,
  RESTAURANTS_PER_PAGE,
  ERRORS
};