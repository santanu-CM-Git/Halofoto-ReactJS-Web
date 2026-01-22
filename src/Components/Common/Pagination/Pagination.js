import React from "react";
import { usePagination, DOTS } from "./usePagination";
import Svg from "../../Image/Svg";
import "./Pagination.css";

const Pagination = (props) => {
  const {
    lastPage,
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });



  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <div className={"blog__details__navigation"}>
      <div className={"blog__single__navigation__prev"} style={{visibility: currentPage >= 2?`visible`:`hidden`}} onClick={onPrevious}>
        <i className="ico__box">
          <Svg />
        </i>
        Previous
      </div>

      <div className={"blog__details__navigation__outer"}>
        {paginationRange.map((pageNumber, index) => {
            
          if (pageNumber === DOTS) {
            return <li className="blog__single__navigation dots" key={index}>&#8230;</li>;
          }

          return (
            <div
              className={currentPage == pageNumber? "blog__single__navigation__active": "blog__single__navigation"} 
              onClick={() => onPageChange(pageNumber)} key={index}
            >
              {pageNumber}
            </div>
          );
        })}
      </div>
        <div className={"blog__single__navigation__next"} style={{visibility: currentPage < lastPage ?`visible`:`hidden`}} onClick={onNext}>
          Next
          <i className="ico__box">
            <Svg />
          </i>
        </div>
    </div>
  );
};

export default Pagination;
