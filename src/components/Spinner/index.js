import React from 'react';

import './styles.scss';

const Spinner = () => {
  return (
    <div className="spinner_container">
      <img
        src="src/assets/spinner.svg"
        alt="Spinner"
        className="spinner__icon"
      />
    </div>
  )
};

export default Spinner;