import React, { Component } from 'react';
import BoardHeader from '../../components/Headers/BoardHeader'
import FirstPost from '../../components/Post/FirstPost';
import {modelInstance} from '../../data/Model';

import './Thread.css';


class Thread extends Component {
  constructor(props) {
  super(props);
  this.state = {
    shadow: 1,
    status: 'INITIAL',
    firstPost: []
  }
}

loadThreadPosts(){
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

componentDidMount() {
  this.loadThreadPosts();
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
      postTitle={this.state.firstPost.title}
      postNumber={this.state.firstPost.id}
      userName={this.state.firstPost.name}
      timeStamp={this.state.firstPost.created}
      mediaURL={this.state.firstPost.mediaURL}
      text={this.state.firstPost.content}
      />
      break;
    default:
      break;
  }
  return (
    <div>
      <BoardHeader title={this.state.firstPost.title}/>
        <div id="thread" className="">
          {theFirstPost}
        </div>
      </div>
    );
  }
}

export default Thread;
