import React, { Component } from 'react';
import MainContent from '../Main';
import PropTypes from 'prop-types';

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

    this.props.fetchRestaurants(city);
  }

  handleSubmit(event) {
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
                name='City searchbar'
                aria-label='City searchbar'
                data-testid="city-search-input"
                type='search'
                onChange={this.setQuery}
                placeholder='Search city...'
                className="searchbar__input"
              />
              <button
                name="Submit button"
                data-testid="city-search-submit-button"
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
        <MainContent />

      </div>
    );
  }
}

Home.propTypes = {
  fetchRestaurants: PropTypes.func.isRequired,
  restaurants: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    entities: PropTypes.object.isRequired,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null])
    ]),
    perPage: PropTypes.number.isRequired,
    status: PropTypes.string
  }).isRequired
};

export default Home;