import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Post from './Post'
import './FirstPost.css';
import {modelInstance} from '../../data/Model';


export default class FirstPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      replyIDs: [],
      replies: []
    };
  }

  //TODO load thread first post and replies
  loadReplies(){
    modelInstance.getReplyIds(this.props.postNumber).then(res => {
      Promise.all(res.map((postID) => modelInstance.getPost(postID)))
        .then(replies =>{
          this.setState({
            status: 'LOADED',
            replyIDs: res,
            replies,
        });
      });
    }).catch(() => {
    this.setState({
      status: 'ERROR',
      replyIDs: [],
      replies: []
    })
    });
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = () => {
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
            <img align="left" id="boardPostImg" src={this.props.mediaURL} alt="" />
          </div>
        break;
      case true:
        postImage =
          <div id="imgDivExpanded" onClick={() => this.handleToggle()}>
            <img align="left" id="boardPostImg" src={this.props.mediaURL} alt="" />
          </div>
      break;
    }
    console.log(this.state);

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
        postImage =
          <div id="imgDivExpanded" onClick={() => this.handleToggle()}>
            <img align="left" id="boardPostImg" src={this.props.mediaURL} alt="" />
          </div>
      break;
    }

  return (
    <div id="post">

        <Card align="left">
        <div id="postHead">
          <CardHeader
          style={{top:-10,left:-5}}
            title={this.props.postTitle}
            subtitle={`${this.props.postNumber}, ${this.props.userName}, ${this.props.timeStamp}`}
          />
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
