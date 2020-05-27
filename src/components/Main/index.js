import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import RestaurantCard from '../RestaurantCard';
import Pagination from '../Pagination';
import Spinner from '../Spinner';
import { ERRORS } from '../../constants/index';
import {
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS,
  FILTER_RESTAURANTS_REQUEST,
  FILTER_RESTAURANTS_COMPLETE
} from '../../constants/actionTypes';
import './styles.scss';

const MainContent = props => {
  const dispatch = useDispatch();

  const {
    entities: { currentPageRestaurants, total },
    currentPage,
    error,
    perPage,
    status
  } = props.restaurantsData;

  const handleFilterChange = () => {
    dispatch({
      type: FILTER_RESTAURANTS_REQUEST,
      filter: event.target.value
    });
  }

  useEffect(() => {
    // dispatch({
    //   type: FILTER_RESTAURANTS_COMPLETE
    // });
  })

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
              onChange={handleFilterChange}
              placeholder='Filter results'
              className="restaurants__filter__input"
            />
          </span>

          {status === FILTER_RESTAURANTS_REQUEST
            ? <Spinner />
            :
            <Fragment>
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

        </Fragment>
      }
    </div>
  );

  const renderMainContent = (status) => {
    switch (status) {
      case FETCH_RESTAURANTS_REQUEST:
        return <Spinner />;
      case FETCH_RESTAURANTS_SUCCESS:
      case FILTER_RESTAURANTS_REQUEST:
      case FILTER_RESTAURANTS_COMPLETE:
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

export default MainContent;