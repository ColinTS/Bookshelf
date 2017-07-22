import React from 'react'
import '../App.css'
import Book from './Book'

const SearchResults = (props) => {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {props.bookResults.map((book) => (
          <Book
            key={book.id}
            book={book}
            updateBook={props.updateBook}
          />
        ))}
      </ol>
    </div>
  )
}

export default SearchResults