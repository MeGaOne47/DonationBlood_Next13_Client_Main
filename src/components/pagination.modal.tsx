import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav>
      <ul className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <li key={index + 1} className={index + 1 === currentPage ? 'page-item active' : 'page-item'}>
            <button className="page-link" onClick={() => onPageChange(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
