import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import './BoardPost.css';


export default class BoardPost extends React.Component {

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
            <img align="left" id="boardPostImg" src={this.props.mediaURL} alt="" />
          </div>
        break;
      case true:
        postImage =
          <div id="imgDivExpanded" onClick={() => this.handleToggle()}>
            <img align="left" id="boardPostImg"src={this.props.mediaURL} alt="" />
          </div>
      break;
    }
    return (
      <div id="boardPost">
        <Card id="boardCard" align="left">
          <div id="postHead" className="container">
            <div id="openButton" className="item">
              <Link to={`/${this.props.boardAbbr}/${this.props.postNumber}`}>
                <RaisedButton label="Open thread" disabledBackgroundColor='#404040' />
              </Link>
            </div>
            <div className="item">
              <CardHeader
                title={this.props.postTitle}
                subtitle={`No. ${this.props.postNumber}, ${this.props.userName} - Time: ${this.props.timeStamp}`}
              />
            </div>

          </div>
          <CardMedia>
            <div className="container">
              <div onClick={() => this.handleToggle()}>
                {postImage}
              </div>
              <CardText>{this.props.text}</CardText>
            </div>
          </CardMedia>

          <CardMedia expandable={true}>
            <img src="http://localhost:3000/static/media/logo.f808e9eb.png" alt="" />
          </CardMedia>
        </Card>
      </div>
    );
  }
}
