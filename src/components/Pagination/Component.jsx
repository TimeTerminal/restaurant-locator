import React, { Component } from 'react';

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
              <div className="pagination__card">
                <button
                  alt={`page ${pageNumber}`}
                  disabled={shouldButtonBeDisabled(pageNumber)}
                  className="pagination__button"
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

export default Pagination;