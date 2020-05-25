import React from 'react';

import './styles.scss';

const RestaurantCard = (props) => {
  // console.log('restaurantData :>> ', props.restaurantData);
  const { address, image_url, name, phone, price } = props.restaurantData;

  return (
    <div className="card_container">
      <p className="card__name">{name}</p>
      <img src={image_url} alt="Restaurant Image" className="card__image" />
      <p className="card__address">{address}</p>
      <p className="card__phone">{phone}</p>
      <p className='card__price'>
        {Array(price).map(() => $)}
      </p>
    </div>
  );
};

export default RestaurantCard;