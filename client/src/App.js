import React, { Component } from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Ninja Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    );
  }
}

export default App;
