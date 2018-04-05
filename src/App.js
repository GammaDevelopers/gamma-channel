import React, { Component } from 'react';
import {Route, Router} from 'react-router-dom';
import logo from './images/logo.png';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';
import Home from './components/Home/Home';
import Thread from './components/Thread/Thread';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <Route exact path='/' component={Home}/>
          <Route path='/thread' component={Thread}/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
