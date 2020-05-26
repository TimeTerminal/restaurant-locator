import React, { Component, Fragment } from 'react';
import RestaurantCard from '../RestaurantCard';
import { ERRORS } from '../../constants/index';
import {
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS
} from '../../constants/actionTypes';

import './styles.scss';

class MainContent extends Component {
  constructor() {
    super();

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange() {
    // this.props.updatePage(event.target.value);
  }

  render() {
    const { entities, error, status } = this.props.restaurants;

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
      <div className="restaurants_container">
        {error === ERRORS.NO_CONTENT
          ? <div className="restaurants__no_content">
            No restaurants match your query
            </div>
          : <Fragment>
            <span className="restaurants__filter">
              <input
                name='Restaurant filter'
                type='search'
                onChange={this.handleFilterChange}
                placeholder='Filter results'
                className="restaurants__filter__input"
              />
            </span>
            <div className="restaurants__list">
              {entities.allRestaurants.map(restaurant => {
                return (
                  <RestaurantCard
                    restaurantData={restaurant}
                    key={restaurant.id}
                  />
                )
              })}
            </div>
          </Fragment>
        }
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
      <section className="main_container">
        {renderMainContent(status)}
      </section>
    );
  }
}

export default MainContent;