import React from 'react';
import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import Post from './Post'
import './FirstPost.css';
import {modelInstance} from '../../data/Model';
import NewPostModal from '../Dialogs/NewPostModal';

var readableTime = require('readable-timestamp');

export default class FirstPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      replyIDs: [],
      replies: [],
      expanded: false
    };
    this.addPostCallback = this.addPostCallback.bind(this);
    this.loadReplies = this.loadReplies.bind(this);
  }

  addPostCallback(postID){
    // this.state.replies.push(modelInstance.getPost(postID));
    this.setState({
      replies: this.state.replies.push(modelInstance.getPost(postID))
    });
  }

  //TODO load thread first post and replies
  loadReplies(){
    console.log("CALLED " );
    modelInstance.getReplyIds(this.props.postNumber).then(res => {
      Promise.all(res.map((postID) => modelInstance.getPost(postID)))
        .then(replies =>{
          this.setState({
            status: 'LOADED',
            replyIDs: res,
            replies,
        })
        return replies;

      });
        return res;
    }).catch(() => {
    this.setState({
      status: 'ERROR',
      replyIDs: [],
      replies: []
    })
    });
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
    this.loadReplies();
  }


  render() {
    let postImage = null;
    let replyPosts = null;
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
            <img align="left" id="postImgExpanded" src={this.props.mediaURL} alt="" />
          </div>
      break;
    }
    console.log(postImage);

    switch(this.state.status){
      case "LOADED":
        replyPosts = this.state.replies.map((reply) =>
          <Post
          key={reply.id}
          postID = {reply.id}
          postTitle={reply.title}
          boardAbbr={reply.abbreviation}
          userName={reply.name}
          timeStamp={reply.created}
          text={reply.content}
          mediaURL={reply.mediaURL}
          />
        )
        break;
      case "ERROR":
        break;
    }

  return (
    <div id="post">
        <Card id="firstPostCard" align="left" style={{paddingBottom:10}}>
        <div id="firstPostHead" className="container">
          <CardHeader className="item"
          style={{top:-10,left:-5}}
            title={this.props.postTitle}
            subtitle={`No.${this.props.postNumber}, ${this.props.userName}, ${readableTime(this.props.timeStamp)}`}
          />
          <div className="item" id="replyBtn">
            <NewPostModal chosenBoard={this.props.name} postNumber={this.props.postNumber} callBackFunc={this.loadReplies}/>
          </div>
        </div>
        <CardMedia>
          <div className="container">
            {postImage}
            <CardText>{this.props.text}</CardText>
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
