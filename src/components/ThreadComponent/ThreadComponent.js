import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import Post from '../Post/Post'
import './ThreadComponent.css';
import NewPostModal from '../Dialogs/NewPostModal';
import readableTime from "readable-timestamp"


export default class ThreadComponent extends React.Component {

  constructor(props) {
    super(props);
    this.modal = React.createRef();
    this.state = {
      expanded: false
    };
  }

  handleToggle = () => {
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

  componentDidMount = () => {
    //Highlight code 
    var current = ReactDOM.findDOMNode(this);
    let query = current.querySelectorAll('pre code');
    for (let code of query) {
      window.hljs.highlightBlock(code);
    }
  }

  render() {
    let postImage = null;
    let replyPosts = null;
    switch(this.state.expanded){
      case true:
        postImage =
          <div className="imgDivExpanded" onClick={() => this.handleToggle()}>
            <img align="left" className="postImgExpanded" src={this.props.mediaURL} alt="" />
          </div>
      break;
      default:
        postImage =
          <div id="imgDiv" onClick={() => this.handleToggle()}>
            <img align="left" className="postImg" src={this.props.mediaURL} alt="" />
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
    replyCallback={(postID)=>{this.modal.current.handleOpen(postID)}}
    />
  )

  let header = (
    <div id="ThreadComponentHead" className="container">
      <CardHeader className="item"
        style={{top:-10,left:-5}}
        title={this.props.postTitle}
        subtitle={`No.${this.props.postNumber}, ${this.props.userName}, ${this.props.timeStamp}`}
      />
      <div className="item" id="replyBtn">
        <RaisedButton label="Reply" onClick={()=>{this.modal.current.handleOpen(this.props.postNumber)}}/>
        <NewPostModal
        ref = {this.modal}
        titleHintText="Reply tite here..."
        titleLabelText="Reply title"
        headText="Reply"
        thread="false"
        threadNumber={this.props.postNumber}
        callBackFunc={this.props.addPostCallback}/>
      </div>
    </div>
    )
  if(this.props.view === "board"){
    header = (
      <Link to={`/${this.props.boardAbbr}/${this.props.postNumber}`}>
        <div className="container postHead">
          <div id="headField" className="item">
            <CardHeader
              title={this.props.postTitle}
              subtitle={`No. ${this.props.postNumber}, ${this.props.userName} - Time: ${this.props.timeStamp} -  Replies: ${this.props.replyCount}`}
            />
          </div>
          <p className="item" id="openThread">
            Open Thread
          </p>
        </div>
      </Link>
    )
  }

  return (
    <div id={this.props.postNumber} className="post">
        <Card id="ThreadComponentCard" align="left" style={{paddingBottom:10}}>
        {header}
        <CardMedia>
          <div className="container">
            {postImage}
            <CardText style={{maxWidth:"90%",paddingTop:0}} dangerouslySetInnerHTML={this.props.text}></CardText>
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
