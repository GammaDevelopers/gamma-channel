import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import './Post.css';


export default class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };
true //<-- what is this
  render() {
    return (
      <div id="post">
        <Card align="left" expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardHeader
            title={this.props.postTitle}
            subtitle={`${this.props.userName}, ${this.props.timeStamp}`}
          />

          <CardMedia>
            <div className="container">
              <img align="left" id="postImg" src="http://localhost:3000/static/media/logo.f808e9eb.png" alt="" />
              <CardText>{this.props.text}</CardText>
            </div>
          </CardMedia>

          <CardActions>
            <FlatButton label="Expand" onClick={this.handleExpand} />
            <FlatButton label="Reduce" onClick={this.handleReduce} />
          </CardActions>

          <CardMedia expandable={true}>
            <img src="http://localhost:3000/static/media/logo.f808e9eb.png" alt="" />
          </CardMedia>
        </Card>
      </div>
    );
  }
}
