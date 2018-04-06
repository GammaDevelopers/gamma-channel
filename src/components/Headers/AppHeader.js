import React, { Component } from 'react';
import '../../index.css';
import Paper from 'material-ui/Paper';
import './BoardHeader.css';
import HeaderLinks from './HeaderLinks';
import logo from '../../images/logo.png';
import BadgeNotification from '../Badge/Badge';


class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Gamma Channel!</h1>
        <BadgeNotification/>
      </header>
    );
  }
}

export default AppHeader;
