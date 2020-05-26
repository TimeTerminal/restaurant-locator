import React, { Component } from 'react';
import RestaurantCard from '../RestaurantCard'
import {
  API_URL,
  ERRORS,
  RESTAURANTS
} from '../../constants/index';
import {
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS
} from '../../constants/actionTypes';

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
    const { entities, error, status } = this.props.restaurants;

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

    const noSearchParamsContainer = (
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

    const restaurantsContainer = (
      <div className="restaurants_list_container">
        {error === ERRORS.NO_CONTENT
          ? <div className="restaurants_list__no_content">
            No restaurants match your query
            </div>
          : entities.currPageRestaurants.map(restaurant => {
            return (
              <RestaurantCard restaurantData={restaurant} key={restaurant.id} />
            )
          })}
      </div>
    );

    const spinnerContainer = (
      <div className="spinner_container">
        <img
          src="src/assets/spinner.svg"
          alt="Spinner"
          className="spinner__icon"
        />
      </div>
    );

    const renderMainContent = (status) => {
      switch (status) {
        case FETCH_RESTAURANTS_REQUEST:
          return spinnerContainer;
        case FETCH_RESTAURANTS_SUCCESS:
          return restaurantsContainer;
        default:
          return noSearchParamsContainer;
      }
    }

    return (
      <div className="home_container" >

        {/* Header */}
        <header className="header">
          <h1 className="header__heading">Restaurants Locator</h1>
          <form name="Search Form" className="header__form">
            <span className="searchbar_container">
              <input
                name='Restaurant searchbar'
                type='search'
                onChange={setQuery}
                placeholder='Search restaurants...'
                className="searchbar__input"
              />
              <button
                name="Submit button"
                type="submit"
                onClick={handleSubmit}
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
        <section className="main_container">
          {renderMainContent(status)}
        </section>

      </div>
    );
  }
}

export default Home;