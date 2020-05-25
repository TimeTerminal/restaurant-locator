import Component from './Component';
import { connect } from 'react-redux';

import * as restaurantsActions from '../../store/restaurants/restaurantsAction';

const mapStateToProps = state => ({
  restaurants: state.restaurants
});

const mapDispatchToProps = dispatch => ({
  fetchRestaurants: restaurantsActions.fetchRestaurantsInjector(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
