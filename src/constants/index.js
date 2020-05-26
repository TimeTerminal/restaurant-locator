const API_URL = 'https://opentable.herokuapp.com/api/';
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
  RESTAURANTS,
  RESTAURANTS_PER_PAGE,
  ERRORS
};