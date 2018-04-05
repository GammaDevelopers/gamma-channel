import React, { Component } from 'react';
import '../../index.css';
import AppBar from 'material-ui/AppBar';
import './HomeAppBar.css';

class HomeAppBar extends Component {
  constructor(props) {
  super(props);
}

  render() {
    return (
        <div id="homeAppBar" className="item">
          <AppBar
            id="boardTitle"
            style={{backgroundColor: "#224"}}
            title={this.props.title}
            titleStyle={{color: "white"}}
            showMenuIconButton={false}
           />
        </div>
    );
  }
}

export default HomeAppBar;
