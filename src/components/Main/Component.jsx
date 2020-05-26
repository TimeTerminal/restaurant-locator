import React, { Component } from 'react';
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
    this.state = {
      filterQuery: '',
    }
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
      <section className="main_container">
        {renderMainContent(status)}
      </section>
    );
  }
}

export default MainContent;