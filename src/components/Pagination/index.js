import Component from './Component';
import { connect } from 'react-redux';

import * as restaurantsActions from '../../store/restaurants/restaurantsAction';

const mapDispatchToProps = dispatch => ({
  updatePage: (filterQuery) => {
    restaurantsActions.updatePage(dispatch, filterQuery)
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Component);