import { combineReducers } from 'redux';

import restaurants from './restaurants/restaurantsReducer';

const rootReducer = combineReducers({
  restaurants
});

export default rootReducer;
