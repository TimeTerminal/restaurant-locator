import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Pagination extends Component {
  render() {
    const { total, perPage, currentPage } = this.props;
    const numberOfPages = Math.ceil(total / perPage);
    const arr = Array.apply(null, Array(numberOfPages));

    const shouldButtonBeDisabled = (index) => {
      if (index === currentPage) {
        return true;
      }

      return false;
    }

    return (
      <section className="pagination_container">
        <span className="pagination__list">
          {arr.map((page, index) => {
            const pageNumber = index + 1;
            return (
              <div className="pagination__card" key={`page ${pageNumber}`}>
                <button
                  alt={`page ${pageNumber}`}
                  disabled={shouldButtonBeDisabled(pageNumber)}
                  className="pagination__button"
                  onClick={() => this.props.updatePage(pageNumber)}
                >
                  {pageNumber}
                </button>
              </div>
            )
          })}
        </span>
      </section>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default Pagination;