import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css';
import Bookshelf from './components/Bookshelf'
import { Link } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'


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
        <div>
          <Route path = '/search' render ={() => (
            <div className="search-books">
              < SearchBar />
              < SearchResults />
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
