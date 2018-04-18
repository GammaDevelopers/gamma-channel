import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router-dom';
import HomeIcon from 'material-ui/svg-icons/action/home';
import './HomeButton.css';

class HomeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }



  render() {
    return (
      <div id="homeButtonDiv">
        <Link to="/">
          <IconButton id="homeButton"
          tooltip="Home"
          iconStyle={{width: 80,height:80}}
          tooltipStyles={{left:18,top:60}}
          style={{width: 80,height:80,padding:0}}>
            <HomeIcon/>
          </IconButton>
        </Link>
      </div>
    );
  }
}

export default HomeButton;
