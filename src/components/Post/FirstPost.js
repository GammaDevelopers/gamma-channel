import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Post from './Post'
import './FirstPost.css';


export default class FirstPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = () => {
    console.log(this.state.expanded);
    if(this.state.expanded == false){
      this.handleExpand();
    }else{
      this.handleReduce();
    }
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  render() {
    let postImage = null;
    switch(this.state.expanded){
      case false:
        postImage =
          <div id="imgDiv" onClick={() => this.handleToggle()}>
            <img align="left" id="boardPostImg" src="http://localhost:3000/static/media/logo.f808e9eb.png" alt="" />
          </div>
        break;
      case true:
        postImage =
          <div id="imgDivExpanded" onClick={() => this.handleToggle()}>
            <img align="left" id="boardPostImg" src="http://localhost:3000/static/media/logo.f808e9eb.png" alt="" />
          </div>
      break;
    }
  return (
    <div id="post">
      <Card align="left">
        <CardHeader
          title={this.props.postTitle}
          subtitle={`${this.props.postNumber}, ${this.props.userName}, ${this.props.timeStamp}`}
        />

        <CardMedia>
          <div className="container">
            {postImage}
            <CardText>{this.props.text}</CardText>
          </div>
        </CardMedia>

        <CardMedia expandable={true}>
          <img src="http://localhost:3000/static/media/logo.f808e9eb.png" alt="" />
        </CardMedia>
        <div id="replies">
          <Post tex/>
          <Post/>
          <Post/>
          <Post/>
        </div>
      </Card>
    </div>
    );
  }
}
