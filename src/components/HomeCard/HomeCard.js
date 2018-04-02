import React, { Component } from 'react';
import '../../index.css';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './HomeCard.css';

class HomeCard extends Component {
  constructor(props) {
  super(props);
  this.state = { shadow: 1 }
}

onMouseOver = () => this.setState({ shadow: 4 });
onMouseOut = () => this.setState({ shadow: 1 });

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div id="board" className="item">
          <Card onMouseOver={this.onMouseOver}
           onMouseOut={this.onMouseOut}
           zDepth={this.state.shadow}>
            <CardTitle align="left" title={this.props.title} subtitle={this.props.subtitle} />
            <CardText align="left">{this.props.cardText}</CardText>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default HomeCard;
