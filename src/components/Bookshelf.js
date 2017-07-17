import React, { Component } from 'react';
import '../App.css'
import Book from './Book'

class Bookshelf extends Component {
  render() {
    const { books, title, updateBook } = this.props
      return (
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>{title}</h2>
            <div className='bookshelf-books'>
              <ol className='books-grid'>
                {books.map((book) => (
                  <Book
                    key={book.id}
                    book={book}
                    updateBook={updateBook}
                  />
                ))}
              </ol>
            </div>
        </div>
       )
    }
}

export default Bookshelf