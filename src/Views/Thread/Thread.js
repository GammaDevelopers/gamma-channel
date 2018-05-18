import React, { Component } from 'react';
import '../../index.css';
import Header from '../../components/Headers/Header'
import FirstPost from '../../components/Post/FirstPost';
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
    firstPost: [],
    posts: []
  }
}

loadThreadPosts() {
  modelInstance.getPost(this.props.match.params.threadID).then(res => {
    this.setState({
      status: 'LOADED',
      firstPost: res
    })
    }).catch(() => {
    this.setState({
      status: 'ERROR',
      firstPost: []
    })
  });
}

loadReplies(){
  console.log("CALLED " );
  modelInstance.getReplyIds(this.props.match.params.threadID).then(res => {
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
  modelInstance.searchPosts(this.props.match.params.threadID, input).then(res => {
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
  console.log(this.props.match.params);
  console.log(this.state);
}

onMouseOver = () => this.setState({ shadow: 4 });
onMouseOut = () => this.setState({ shadow: 1 });

render() {
  let theFirstPost = null;
  switch(this.state.status){
    case 'LOADED':
      theFirstPost =
      <FirstPost 
      addPostCallback={this.addPostCallback.bind(this)}
      postTitle={this.state.firstPost.title}
      postNumber={this.state.firstPost.id}
      userName={this.state.firstPost.name}
      timeStamp={readableTime(this.state.firstPost.created)}
      mediaURL={this.state.firstPost.mediaURL}
      text={this.state.firstPost.content}
      replies={this.state.posts}
      />
      break;
    default:
      break;
  }
  return (
    <div>
      <Header title={this.state.firstPost.title} type="thread"/>
      <SearchBar callback={this.onSearchChange.bind(this)} type="board"/>
        <div id="thread" className="">
          {theFirstPost}
        </div>
      </div>
    );
  }
}

export default Thread;
