import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import configureStore from '../store';
import Home from './Home';
import Footer from './Footer';
import '../styles/index.scss';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <div className="app_container">
        <Provider store={store}>
          <Home />
          <Footer />
        </Provider>
      </div>
    );
  }
}

export default hot(App);