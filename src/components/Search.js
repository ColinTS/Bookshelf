import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import SearchResults from './SearchResults'

const SearchBar = (props) => {
  return (
    <div>
      <div className="search-books-bar">
        <Link className="close-search" to='/'>Close</Link>
        <div className="search-books-input-wrapper">
          <input 
            type="text" 
            placeholder="Search by title or author" 
            onChange={(event) => props.searchBooks(event.target.value,10)}
            />
        </div>
      </div>
       < SearchResults 
            updateBook={props.updateBook}
            bookResults={props.bookResults}
        />
    </div>
  )
}

export default SearchBar