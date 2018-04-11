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
      <header className="appHeader">
        <img src={logo} className="appLogo" alt="logo" />
        <div className="container" id="appContainer">
          <div className="appTitle item">
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
