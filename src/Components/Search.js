import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

const Search = ({ placeHolder, data, dis, filterBy }) => {
  const onsubmit = (e) => {
    e.preventDefault();
    dis({ data: _.mapKeys(data.filter((i) => i[filterBy] === document.querySelector('#search').value), "id"), searchText: document.querySelector('#search').value })
  }
  return (
    <div className='row justify-content-center mt-2'>
      <form onChange={() => {
        setTimeout(() => {
          dis({ data: _.mapKeys(data.filter((i) => i[filterBy] === document.querySelector('#search').value), "id"), searchText: document.querySelector('#search').value })
        }, 1800)
      }} id="searchForm" className='col-5 input-group' onSubmit={onsubmit}>
        <input id="search" type="text" className='bg-y1 form-control' placeholder={placeHolder} />
        <div className='input-group-append'>
          <button id="searchbtn" className='btn btn-outline-success'><i className='fa fa-thin fa-search'></i></button>
        </div>
      </form>
    </div>
  )
}

export default Search
