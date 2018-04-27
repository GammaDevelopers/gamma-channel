import React from 'react';
import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import OpenThreadBtn from '../Buttons/OpenThreadBtn'
import { Link } from 'react-router-dom';
import './BoardPost.css';


export default class BoardPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = () => {
    console.log(this.state.expanded);
    if(this.state.expanded === false){
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
            <img align="left" id="postImg" src={this.props.mediaURL} alt="" />
          </div>
        break;
      case true:
        postImage =
          <div id="imgDivExpanded" onClick={() => this.handleToggle()}>
            <img align="left" id="postImgExpanded"src={this.props.mediaURL} alt="" />
          </div>
      break;
    }
    return (
      <div id="boardPost">
        <Card id="boardCard" align="left">
          <div id="postHead" className="container">
            <div id="openButton" className="item">
              <Link to={`/${this.props.boardAbbr}/${this.props.postNumber}`}>
                <OpenThreadBtn/>
              </Link>
            </div>
            <div id="headField" className="item">
              <CardHeader
                title={this.props.postTitle}
                subtitle={`No. ${this.props.postNumber}, ${this.props.userName} - Time: ${this.props.timeStamp} -  Replies: ${this.props.replyCount}`}
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

        </Card>
      </div>
    );
  }
}
