import React, { Component } from 'react';
import logo from './images/logo.png';
import './App.css';
import Home from './components/Home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Gamma Channel!</h1>
        </header>
        <Home />
      </div>
    );
  }
}

export default App;
