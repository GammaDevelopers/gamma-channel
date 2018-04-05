import React, { Component } from 'react';
import {Route, Router} from 'react-router-dom';
import logo from './images/logo.png';
import './App.css';
import Home from './components/Home/Home';
import Thread from './components/Thread/Thread';

class App extends Component {

  render() {
    return (
      <div className="App">
          <Route exact path='/' component={Home}/>
          <Route path='/thread' component={Thread}/>
      </div>
    );
  }
}

export default App;
