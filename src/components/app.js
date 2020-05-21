import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';

import Home from './Home';

function App(props) {
  const [counter, setCounter] = useState(0)

class App extends Component {
  render() {
    return (
    <>
        <Home />
        {counter}
    );
  }
}

export default hot(App);