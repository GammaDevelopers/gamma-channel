import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
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
        style={{left:-10,top:-10}}
        iconStyle={{width: 30,height:30}}
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
