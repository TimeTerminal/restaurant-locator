import React, { Component } from 'react';
import MainContent from '../Main';
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setQuery = this.setQuery.bind(this);
  }

  fetchRestaurants(query = null) {
    let city = query;

    if (query === null) {
      city = 'toronto';
    }

    const url = `${API_URL}${RESTAURANTS}?city=${city}`;
    this.props.fetchRestaurants(url);
  }

  handleSubmit() {
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
      this.fetchRestaurants(this.state.searchQuery);
    }
    return false;
  }

  setQuery(event) {
    this.setState({ searchQuery: event.target.value });
  }

  render() {
    const { searchError, searchQuery } = this.state;

    return (
      <div className="home_container">

        {/* Header */}
        <header className="header">
          <h1 className="header__heading">Restaurants Locator</h1>
          <form name="Search Form" className="header__form">
            <span className="searchbar_container">
              <input
                name='Restaurant searchbar'
                type='search'
                onChange={this.setQuery}
                placeholder='Search restaurants...'
                className="searchbar__input"
              />
              <button
                name="Submit button"
                type="submit"
                onClick={this.handleSubmit}
                disabled={!searchQuery.length}
                className="searchbar__button"
              >
                <img src='src/assets/search.svg' alt="Search icon" />
              </button>
              {searchError.show &&
                <label htmlFor="Restaurant searchbar">
                  {searchError.message}
                </label>}
            </span>
          </form>
        </header>

        {/* Main body */}
        <MainContent restaurants={this.props.restaurants} />;

      </div>
    );
  }
}

export default Home;