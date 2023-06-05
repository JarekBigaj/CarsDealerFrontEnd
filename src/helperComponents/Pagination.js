import React from 'react'
import "../styles/Pagination.css"

const Pagination = ({currentPage, pages, handleChangeCurrentPage}) => {
    const listOfPages = [];
    for(let i =0; i<pages ; i++)
        listOfPages.push(i+1);
    
  return (
    <div className='pagination-wrapper'>
        <span className='pagination-arrow left'></span>
        <ul className='pagination-list'>
            {
                listOfPages.map(page => 
                <li 
                    className={`pagination-item ${page === currentPage ? `active` :''}`} 
                    key={`page${page}`}
                    onClick={() => handleChangeCurrentPage(page)}
                >
                    {page}
                </li>)
            }
        </ul>
        <span className='pagination-arrow right'></span>
    </div>
  )
}

export default Pagination