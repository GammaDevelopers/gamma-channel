import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router-dom';
import FullscreenIcon from 'material-ui/svg-icons/navigation/fullscreen';
import './OpenThreadBtn.css';

class OpenThreadBtn extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }
  render() {
    return (
      <div id="buttonDiv">
        <IconButton id="OpenThreadBtn"
        tooltip="Open Thread"
        tooltipStyles={{top:5}}
        tooltipPosition="top-right"
        >
          <FullscreenIcon/>
        </IconButton>
      </div>
    );
  }
}

export default OpenThreadBtn;
