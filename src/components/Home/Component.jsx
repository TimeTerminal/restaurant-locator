import React, { Component } from 'react';
import { API_URL, RESTAURANTS } from '../../constants/index';

import './styles.scss';

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

  fetchRestaurants(query = null) {
    let city = query;

    if (query === null) {
      city = 'toronto';
    }

    const url = `${API_URL}${RESTAURANTS}?city=${city}`;

    this.props.fetchRestaurants(url);
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
        this.fetchRestaurants(searchQuery);
      }
      return false;
    }

    const noSearchParamsDiv = (
      <div className="no_restaurants_container">
        <img
          src='src/assets/Opentable logo.png'
          alt="Opentable logo"
          className="no_restaurants__logo"
        />
        <h2 className="no_restaurants__heading_one">
          No City Selected
        </h2>
        <h3 className="no_restaurants__heading_two">
          Please input a city in the searchbar
        </h3>
      </div>
    );

    return (
      <div className="home_container" >
        <div className="top_bar">
          <h1 className="top_bar__heading">Restaurants Locator</h1>
          <form name="Search Form" className="top_bar__form">
            <input
              name='Restaurant searchbar'
              type='search'
              onChange={setQuery}
              placeholder='Search restaurants...'
              className="top_bar__form__searchbar"
            />
            <button
              name="Submit buttton"
              type="submit"
              onClick={handleSubmit}
              disabled={!searchQuery.length}
              className="top_bar__form__button"
            >
              <img src='src/assets/search.svg' alt="Search icon" />
            </button>
            {searchError.show &&
              <label htmlFor="Restaurant searchbar">
                {searchError.message}
              </label>}
          </form>
        </div>

        <div className="restaurants_list">
          {noSearchParamsDiv}
        </div>
      </div>
    );
  }
}

export default Home;