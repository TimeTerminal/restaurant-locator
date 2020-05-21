import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { API_URL, RESTAURANTS } from '../../constants';

class Home extends Component {
  componentDidMount() {
    axios.get(`${API_URL}${RESTAURANTS}?city=toronto`)
      .then(res => {
        console.log('res :>> ', res);
      });
  }

  render() {
    return (
      <Fragment>
        <h1>Restaurants in your area</h1>

      </Fragment>
    );
  }
}

export default Home;