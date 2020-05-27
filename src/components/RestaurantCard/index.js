import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const RestaurantCard = (props) => {
  const { address, image_url, name, phone, price } = props.restaurantData;

  const formatPhone = number => {
    const splitNumber = number.split('');

    const formattedPhone = splitNumber.map((digit, index) => {
      switch (index) {
        case 0:
          return `(${digit}`;
        case 2:
          return `${digit}) `;
        case 5:
          return `${digit}-`;
        default:
          return digit;
      }
    })

    return formattedPhone;
  }

  const formatPrice = price => {
    const arr = Array.apply(null, Array(price));
    const dollarSigns = arr.map(() => {
      return '$'
    });

    return dollarSigns;
  }

  return (
    <div className="card_container">
      <p className="card__name">{name}</p>
      <img src={image_url} alt="Restaurant Image" className="card__image" />
      <p className="card__address">{address}</p>
      <p className="card__phone">{formatPhone(phone)}</p>
      <p className='card__price'>
        {formatPrice(price)}
      </p>
    </div>
  );
};

RestaurantCard.propTypes = {
  restaurantData: PropTypes.shape({
    address: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired
};

export default RestaurantCard;