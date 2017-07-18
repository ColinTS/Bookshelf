import React, { Component } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import SearchResults from './SearchResults'

class SearchBar extends Component {

  render() {
    const { bookResults, searchBooks, updateBook } = this.props

    return (
    <div>
      <div className="search-books-bar">
        <Link className="close-search" to='/'>Close</Link>
        <div className="search-books-input-wrapper">
          <input 
            type="text" 
            placeholder="Search by title or author" 
            onChange={(event) => searchBooks(event.target.value,10)}
            />
        </div>
      </div>
       < SearchResults 
            updateBook={updateBook}
            bookResults={bookResults}
        />
    </div>
    )
  }
}

export default SearchBar