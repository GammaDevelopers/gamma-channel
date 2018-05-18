import React, { Component } from 'react';
import ThreadComponent from '../../components/Post/ThreadComponent';
import SearchBar from '../../components/SearchBar/SearchBar';
import {modelInstance} from '../../data/Model';
import readableTime from "readable-timestamp"
import './Thread.css';


class Thread extends Component {
  constructor(props) {
  super(props);
  this.state = {
    shadow: 1,
    status: 'INITIAL',
    threadComponent: [],
    posts: []
  }
}

loadThreadPosts() {
  modelInstance.getPost(this.props.threadID).then(res => {
    this.setState({
      status: 'LOADED',
      threadComponent: res
    })
    }).catch(() => {
    this.setState({
      status: 'ERROR',
      threadComponent: []
    })
  });
}

loadReplies(){
  console.log("CALLED " );
  modelInstance.getReplyIds(this.props.threadID).then(res => {
    Promise.all(res.map((postID) => modelInstance.getPost(postID)))
      .then(replies =>{
        this.setState({
          replyIDs: res,
          posts: replies,
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

onSearchChange(input) {
  if(input === ""){
    this.loadReplies();
    return;
  }
  console.log("CALLED " );
  modelInstance.searchPosts(this.props.threadID, input).then(res => {
    Promise.all(res.map((postID) => modelInstance.getPost(postID)))
      .then(replies =>{
        this.setState({
          replyIDs: res,
          posts: replies,
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

addPostCallback(postID){
  modelInstance.getPost(postID).then( (post) => this.setState({
    replies: this.state.posts.push(post)
  }))
}

componentDidMount() {
  this.loadThreadPosts();
  this.loadReplies();
  console.log("Component mounts here");
  console.log(this.state);
}

onMouseOver = () => this.setState({ shadow: 4 });
onMouseOut = () => this.setState({ shadow: 1 });

render() {
  let theThreadComponent = null;
  switch(this.state.status){
    case 'LOADED':
      theThreadComponent =
      <ThreadComponent
      addPostCallback={this.addPostCallback.bind(this)}
      postTitle={this.state.threadComponent.title}
      postNumber={this.state.threadComponent.id}
      userName={this.state.threadComponent.name}
      timeStamp={readableTime(this.state.threadComponent.created)}
      mediaURL={this.state.threadComponent.mediaURL}
      text={this.state.threadComponent.content}
      replies={this.state.posts}
      />
      break;
    default:
      break;
  }
  return (
    <div>
      <SearchBar callback={this.onSearchChange.bind(this)} type="board"/>
        <div id="thread" className="">
          {theThreadComponent}
        </div>
      </div>
    );
  }
}

export default Thread;
