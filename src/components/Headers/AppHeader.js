import React, { Component } from 'react';
import '../../index.css';
import './AppHeader.css'
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
        <div className="container" id="App-container">
          <div className="App-title item">
            <h1>Welcome to Gamma Channel!</h1>
          </div>
          <div className="appNotifications item">
            <BadgeNotification/>
          </div>
        </div>
      </header>
    );
  }
}

export default AppHeader;
