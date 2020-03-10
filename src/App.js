import React, { Component } from 'react';
import './App.css';
import Book from './book/book';

class App extends Component {
  //setting up initial state in constructor
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search: '',
      sort: '',
      error: null
    }
  }

  //Create methods to update state
  setSearch(search) {
    this.setState({
      search
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  //finally => add the form-submit handler 
  handleSubmit(e) {
    e.preventDefault();

    //construct a URL with the query string
    //Attach it to the URL
    const baseUrl = 'http://localhost:8000/books';
    const params = [];
    if(this.state.search) {
      params.push(`search=${this.state.search}`);
    }
    if(this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    //Perform fetch
    fetch(url) 
      .then(res => {
        if(!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      //update the state with returned data
      .then(data => {
        this.setState({
          books: data,
          error: null //reset errors
        });
      })
      //if there's an error when fetching data => display a message to user
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get books at this time.'
        })
      })
  }

  //inside render => display list of book & the form 
  //Attach onChange listeners to components for updating the state 
  //..as the user selects values
  render() {
    //map over all the books
    const books = this.state.books.map((book, i) => {
      return <Book {...book} key={i}/>
    })
    return (
      <main className='App'>
        <h1>
          NYT Best Sellers
        </h1>
        <div className='search'>
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor='search'>Search:</label>
            <input 
            type='text'
            id='search'
            name='search'
            value={this.state.search}
            onChange={e => this.setSearch(e.target.value)} 
            />

            <label htmlFor='sort'>Sort:</label>
            <select
            id='sort'
            name='sort'
            onChange={e => this.setSort(e.target.value)}
            >
              <option value=''>None</option>
              <option value='title'>Title</option>
              <option value='rank'>Rank</option>
            </select>
            <button type='submit'>Search</button>
          </form>
          <div className='App_error'>
            {this.state.error}
          </div>
        </div>
        { books }
      </main>
    )
  }
}

export default App; 