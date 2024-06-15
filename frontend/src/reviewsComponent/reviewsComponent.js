import React, { useState, useEffect } from 'react';
import Feedback from '../feedback/feedback';

function ReviewsComponent({id}) {
  const [reviews, setreviews] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch(`http://26.69.114.65:8080/laptops/${id}/reviews?page=0&size=10`)
      .then(response => response.json())

      .then(page => {
        setreviews(page.content);
        setPageInfo({
          totalPages: page.totalPages,
          totalElements: page.totalElements,
          currentPage: page.number,
          pageSize: page.size
        });
      })
      .catch(error => console.error('Error fetching reviews:', error));
  }, 
  [currentPage]);

  const handleNextPage = () => {
    if (currentPage < pageInfo.totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  console.log(reviews);
  const elementProduct = reviews.map(item => {
      return (
          <Feedback
              {...item}
          />
      )
  });
  return (
    <div>
      <ul className='reviews__list'>
        {elementProduct}
      </ul>
      {/* <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <span>Page {pageInfo.currentPage + 1} of {pageInfo.totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === pageInfo.totalPages - 1}>
          Next
        </button>
      </div> */}
    </div>
  );
}

export default ReviewsComponent;