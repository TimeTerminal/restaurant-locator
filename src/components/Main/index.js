import Component from './Component';
import { connect } from 'react-redux';

import * as restaurantsActions from '../../store/restaurants/restaurantsAction';

const mapDispatchToProps = dispatch => ({
  filterRestaurants: restaurantsActions.filterRestaurants(dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(Component);