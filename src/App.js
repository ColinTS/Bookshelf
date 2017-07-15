import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css';
import Bookshelf from './components/Bookshelf'


class BooksApp extends Component {
    state = {
      books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
      showSearchPage: false
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({books})
    })
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({books})
    })
  }

   updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      this.getAllBooks()
      console.log(res)
    })
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                
                < Bookshelf
                  title='Current Reading'
                  updateBook={this.updateBook}
                  books={books.filter((book)=> book.shelf === 'currentlyReading')}
                />
                < Bookshelf 
                  title='Wants To Read'
                  updateBook={this.updateBook}
                  books={books.filter((book)=> book.shelf === 'wantToRead')}
                />
                < Bookshelf
                  title='Read'
                  updateBook={this.updateBook}
                  books={books.filter((book)=> book.shelf === 'read')}
                />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp;
