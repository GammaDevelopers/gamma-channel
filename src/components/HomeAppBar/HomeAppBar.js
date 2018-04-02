import React, { Component } from 'react';
import '../../index.css';
import AppBar from 'material-ui/AppBar';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './HomeAppBar.css';

class HomeAppBar extends Component {
  constructor(props) {
  super(props);
}

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div id="homeAppBar" className="item">
          <AppBar
            id="boardTitle"
            style={{backgroundColor: "#224"}}
            title={this.props.title}
            titleStyle={{color: "white"}}
            showMenuIconButton={false}
           />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default HomeAppBar;
