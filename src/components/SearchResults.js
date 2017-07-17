import React, { Component } from 'react'
import '../App.css'

class SearchResults extends Component {
  render () {
    return (
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
    )
  }
}

export default SearchResults