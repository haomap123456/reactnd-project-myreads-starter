import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'
import './App.css'
import SearchPage from './SearchPage.js'
import BookList from './BookList.js'

 class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount(){
    this.fetchMyBooks()
  }

  fetchMyBooks = () => {
    BooksAPI.getAll().then((books) => this.setState({ books }))
  }

  changeShelf = (id,shelf) => {
    BooksAPI.update({id},shelf).then(()=>{
      this.fetchMyBooks()
    })
  }

  render() {
    return (
      <div className="app">
          <Route exact path="/search" render={() => (
              <SearchPage myBooks={this.state.books}  onShelfChange={(id,shelf)=>{
                  this.changeShelf(id,shelf)
                }}
              />
            )}
          />

          <Route exact path="/" render={()=>(
            <BookList books={this.state.books} onShelfChange={(id,shelf)=>{
                this.changeShelf(id,shelf)
                }}
              />
            )}
          />
      </div>
    )
  }
}
export default BooksApp;