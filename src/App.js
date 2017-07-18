import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css';
import Bookshelf from './components/Bookshelf'
import { Link } from 'react-router-dom'
import Search from './components/Search'


class BooksApp extends Component {
    state = {
      books: [],
      bookResults: []
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

  searchBooks = (query, maxResults) => {
    BooksAPI.search(query, maxResults).then(books => {
      console.log(books)
      query.length > 0 && (books.error ? (this.setState({bookResults: []})) : (this.setState({bookResults: books})))
    })
  }

  render() {
    const { books, bookResults } = this.state
    return (
      <div className="app">
        <div>
          <Route path = '/search' render ={() => (
            <div className="search-books">
              < Search 
                searchBooks={this.searchBooks}
                updateBook={this.updateBook}
                bookResults={bookResults}
              />
            </div>
          )}/>

          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-content">
                <div>
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  < Bookshelf
                    title='Currently Reading'
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
                  <Link className="open-search" to='/search'>
                    <a>Add a book</a>
                  </Link>
                </div>
              </div> 
            </div>
          )}/>
        </div>
      </div>
    )
  }
}

export default BooksApp;
