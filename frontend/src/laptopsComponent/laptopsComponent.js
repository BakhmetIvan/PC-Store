import React, { useState, useEffect } from 'react';
import Product from '../product/product';

function LaptopsComponent(props) {
  const [laptops, setLaptops] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch('http://26.69.114.65:8080/laptops?page=0&size=10')
      .then(response => response.json())

      .then(page => {
        setLaptops(page.content);
        setPageInfo({
          totalPages: page.totalPages,
          totalElements: page.totalElements,
          currentPage: page.number,
          pageSize: page.size
        });
      })
      .catch(error => console.error('Error fetching laptops:', error));
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
  console.log(laptops);
  const elementProduct = laptops.map(item => {
      return (
          <Product
              productId = {item.id}
              {...item}
              cartData={props.cartData} 
              updateCartData={() => props.updateCartData()}
          />
      )
  });
  return (
    <div>
      <ul className='check_flexbox'>
        {elementProduct}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <span>Page {pageInfo.currentPage + 1} of {pageInfo.totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === pageInfo.totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default LaptopsComponent;