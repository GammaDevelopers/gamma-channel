import React, { Component } from 'react';
import '../../index.css';
import Paper from 'material-ui/Paper';
import './BoardHeader.css';
import logo from '../../images/logo.png';


class BoardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">/{this.props.abbreviation}/ - {this.props.name}</h1>
      </header>
    );
  }
}

export default BoardHeader;
