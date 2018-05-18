import React from 'react';
import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import Post from './Post'
import './FirstPost.css';
import {modelInstance} from '../../data/Model';
import NewPostModal from '../Dialogs/NewPostModal';
import OpenThreadBtn from '../Buttons/OpenThreadBtn'
import { Link } from 'react-router-dom';
import readableTime from "readable-timestamp"


export default class FirstPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

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

  componentDidMount() {
  }

  render() {
    let postImage = null;
    let replyPosts = null;
    switch(this.state.expanded){
      case true:
        postImage =
          <div id="imgDivExpanded" onClick={() => this.handleToggle()}>
            <img align="left" id="postImgExpanded" src={this.props.mediaURL} alt="" />
          </div>
      break;
      default:
        postImage =
          <div id="imgDiv" onClick={() => this.handleToggle()}>
            <img align="left" id="postImg" src={this.props.mediaURL} alt="" />
          </div>
        break;
    }

  replyPosts = this.props.replies.map((reply) =>
    <Post
    key={reply.id}
    postID = {reply.id}
    threadID = {this.props.postNumber}
    postTitle={reply.title}
    boardAbbr={reply.abbreviation}
    userName={reply.name}
    timeStamp={readableTime(reply.created)}
    text={reply.content}
    mediaURL={reply.mediaURL}
    callBackFunc={this.props.addPostCallback}
    />
  )

  let header = (
    <div id="firstPostHead" className="container">
      <CardHeader className="item"
      style={{top:-10,left:-5}}
        title={this.props.postTitle}
        subtitle={`No.${this.props.postNumber}, ${this.props.userName}, ${this.props.timeStamp}`}
      />
      <div className="item" id="replyBtn">
        <NewPostModal
        buttonText="Reply"
        headText="New Reply"
        thread="false"
        titleHintText="Reply title here..."
        titleLabelText="Reply title"
        threadNumber={this.props.postNumber}
        //postNumber={this.props.postNumber}
        callBackFunc={this.props.addPostCallback}/>
      </div>
    </div>
    )
  if(this.props.view === "board"){
    header = (
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
    )
  }

  return (
    <div id="post">
        <Card id="firstPostCard" align="left" style={{paddingBottom:10}}>
        {header}
        <CardMedia>
          <div className="container">
            {postImage}
            <CardText style={{paddingTop:0}} dangerouslySetInnerHTML={this.props.text}></CardText>
          </div>
        </CardMedia>
        <div id="replies">
          {replyPosts}
        </div>
      </Card>
    </div>
    );
  }
}
