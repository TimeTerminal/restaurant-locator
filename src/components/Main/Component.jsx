import React, { Component, Fragment } from 'react';

import RestaurantCard from '../RestaurantCard';
import Pagination from '../Pagination';
import Spinner from '../Spinner';
import {
  DATA_LOADING,
  DATA_LOADED,
  ERRORS
} from '../../constants/index';
import './styles.scss';

class MainContent extends Component {
  constructor() {
    super();

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange() {
    this.props.filterRestaurants(event.target.value);
  }

  render() {
    const {
      entities: { currentPageRestaurants, total },
      currentPage,
      error,
      perPage,
      status
    } = this.props.restaurantsData;

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
          :
          <Fragment>

            {/* Filter */}
            <span className="restaurants__filter">
              <input
                name='Restaurant filter'
                type='search'
                onChange={this.handleFilterChange}
                placeholder='Filter results'
                className="restaurants__filter__input"
              />
            </span>

            {/* Pagination top */}
            <Pagination
              total={total}
              perPage={perPage}
              currentPage={currentPage}
            />

            <div className="restaurants__list">
              {currentPageRestaurants.map(restaurant => {
                return (
                  <RestaurantCard
                    restaurantData={restaurant}
                    key={restaurant.id}
                  />
                )
              })}
            </div>

            {/* Pagination bottom */}
            <Pagination
              total={total}
              perPage={perPage}
              currentPage={currentPage}
            />

          </Fragment>
        }
      </div>
    );

    const renderMainContent = (status) => {
      switch (status) {
        case DATA_LOADING:
          return <Spinner />;
        case DATA_LOADED:
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