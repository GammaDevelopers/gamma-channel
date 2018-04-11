import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import homeIcon from '../../images/homeIcon.png';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router-dom';
import './HomeButton.css';

class HomeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }
  render() {
    return (
      <div id="buttonDiv">
        <Link to="/">
          <IconButton id="homeButton" tooltip="Home">
            <i className="material-icons md-36">home</i>
          </IconButton>
        </Link>
      </div>
    );
  }
}

export default HomeButton;
