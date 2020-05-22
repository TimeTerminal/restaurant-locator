import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { API_URL, RESTAURANTS } from '../../constants';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
      searchError: {
        show: false,
        message: ''
      }
    }

    this.fetchRestaurants = this.fetchRestaurants.bind(this);
  }

  componentDidMount() {
    // this.fetchRestaurants();
  }

  fetchRestaurants(query = null) {
    if (query === null) {
      query = '?city=toronto';
    }

    axios.get(`${API_URL}${RESTAURANTS}${query}`)
      .then(res => {
        console.log('response: ', res);
      });
  }

  render() {
    const { searchError, searchQuery } = this.state;

    const setQuery = (event) => {
      this.setState({ searchQuery: event.target.value });
    }

    const handleSubmit = () => {
      event.preventDefault();
      event.stopPropagation();
      
      if (!this.state.searchQuery.length) {
        this.setState({
          searchError: {
            show: true,
            message: "Required"
          }
        })
      } else {
        console.log('Triggering the (commented out) fetch func');
        // this.fetchRestaurants(searchQuery);
      }
      return false;
    }

    return (
      <Fragment>
        <h1>Restaurants in your area</h1>
        <form name="Search Form">
          <input
            name='Restaurant searchbar'
            type='search'
            onChange={setQuery}
          />
          <button
            name="Submit buttton"
            type="submit"
            onClick={handleSubmit}
            disabled={!searchQuery.length}
          >
            Submit
          </button>
          {searchError.show && <label htmlFor="Restaurant searchbar">
            {searchError.message}
          </label>}
        </form>

      </Fragment>
    );
  }
}

export default Home;