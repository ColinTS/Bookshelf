import React, { Component } from 'react'
import '../App.css'
import Book from './Book'

class SearchResults extends Component {
  render () {
    const { bookResults, updateBook } = this.props
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {bookResults.map((book) => (
            <Book
              key={book.id}
              book={book}
              updateBook={updateBook}
            />
          ))}
        </ol>
      </div>
    )
  }
}

export default SearchResults