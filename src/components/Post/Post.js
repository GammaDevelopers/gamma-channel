import React from 'react';
import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import './Post.css';
import NewPostModal from '../Dialogs/NewPostModal';

var readableTime = require('readable-timestamp');

export default class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  loadReplies(){
    console.log("CALLED " );
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
      case true:
        postImage =
          <div id="imgDivExpanded" onClick={() => this.handleToggle()}>
            <img align="left" id="postImgExpanded" src={this.props.mediaURL}  alt="" />
          </div>
          break;
      default:
        postImage =
          <div id="imgDiv" onClick={() => this.handleToggle()}>
            <img align="left" id="postImg" src={this.props.mediaURL} alt="" />
          </div>
        break;
    }
    return (
      <div id="post">
        <Card align="left" expanded={this.state.expanded} onExpandChange={this.handleExpandChange} style={{
      backgroundColor: '#404040'}}>
          <div id="replyPostHead" className="container">
            <CardHeader
            style={{top:-10,left:-5}}
              title={this.props.postTitle}
              subtitle={`No. ${this.props.postID}, ${this.props.userName}, ${readableTime(this.props.timeStamp)}`}
            />
            <div className="item" id="replyBtn">
              <NewPostModal chosenBoard={this.props.userName} postNumber={this.props.postID} threadNumber={this.props.threadID} callBackFunc={this.props.callBackFunc}/>
            </div>
          </div>

          <CardMedia>
            <div className="container">
              {postImage}
              <CardText style={{paddingTop:0}} dangerouslySetInnerHTML={this.props.text}></CardText>
            </div>
          </CardMedia>
        </Card>
      </div>
    );
  }
}
