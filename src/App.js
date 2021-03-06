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
      this.setState({books})
    })
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

   updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      console.log('updated book', book)
      this.getAllBooks()
    })
  }

  searchBooks = (query, maxResults) => {
    //  removes the display of book thumbails if nothing is searched
    query.length === 0 && this.setState({bookResults: []})
   
    query.length > 0 &&
      BooksAPI.search(query, maxResults).then(searchedBooks => {
        if(!searchedBooks.error){
          searchedBooks.map((searchedBook) => {
            let unmatched = this.state.books.filter(book => book.id !== searchedBook.id)
            let match = this.state.books.filter(book => book.id === searchedBook.id)
            if(match.length > 0){
              return searchedBook.shelf = match[0].shelf
            }
            if(unmatched.length > 0){
              return searchedBook.shelf = 'none'
            }
          })
        }
      //  displays no books in search results if there are no search resulsts 
      //  and displays books if there are.
        searchedBooks.error || searchedBooks === undefined ? (this.setState({bookResults: []})) : (this.setState({bookResults: searchedBooks}))
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
                books={books}
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
