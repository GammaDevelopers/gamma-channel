import React, { Component } from 'react';
import './Board.css';
import Header from '../../components/Headers/Header';
import FirstPost from '../../components/Post/FirstPost';
import SearchBar from '../../components/SearchBar/SearchBar';
import {modelInstance} from '../../data/Model';
import ContentLoader from "react-content-loader"
import readableTime from "readable-timestamp"

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      threads: [],
      firstPosts: []
    }
  }

  loadThreads() {
    modelInstance.getThreads(this.props.boardName).then(res => {
      Promise.all(res.map((thread) =>{
          return modelInstance.getPost(thread.firstPost).then( (post) => {
            post.replyCount = thread.replyCount;
            return post;
          });
        }))
        .then(firstPosts => {
          this.setState({
            replyCount: res.replyCount,
            status: 'LOADED',
            threads: res,
            firstPosts,
          });
        });

      }).catch(() => {
      this.setState({
        status: 'ERROR',
        threads: [],
        firstPosts: []
      })
    });
  }

  onSearchChange(input) {
    if(input === ""){
      this.loadThreads();
      return;
    }
    modelInstance.searchThreads(this.props.boardName, input).then(res => {
      Promise.all(res.map((thread) =>{
          return modelInstance.getPost(thread.firstPost).then( (post) => {
            post.replyCount = thread.replyCount;
            return post;
          });
        }))
        .then(firstPosts => {
          this.setState({
            replyCount: res.replyCount,
            status: 'LOADED',
            threads: res,
            firstPosts,
          });
        });

      }).catch(() => {
      this.setState({
        status: 'ERROR',
        threads: [],
        firstPosts: []
      })
    });
  }

  componentDidMount = () => {
    this.loadThreads();
  }

  render() {
    let threadList = null;
    const MyLoader = (key) => (
      <div key={key} id="threadLoader">
      	<ContentLoader
      		height={400}
      		width={1920}
      		speed={2}
          primaryColor="#a4a4a4"
  		    secondaryColor="#ecebeb">
      		<rect x="0" y="0" rx="0" ry="0" width="1920" height="400" />
      	</ContentLoader>
      </div>
    )

    switch(this.state.status){
      case 'LOADED':
        threadList = this.state.firstPosts.map((post) =>
          <FirstPost
           view="board"
           replies={[]}
           key={post.id}
           userName={post.name}
           postNumber={post.id}
           timeStamp={readableTime(post.created)}
           postTitle={post.title}
           text={post.content}
           mediaURL={post.mediaURL}
           replyCount={post.replyCount}
           boardAbbr={this.props.boardAbbr}
           boardName={this.props.boardName}
          />
        )
        break;
      default:
      threadList = [MyLoader(1),MyLoader(2),MyLoader(3),MyLoader(4)]
        break;
    }
    return (
      <div>
        <Header
        boardAbbr={this.props.boardAbbr}
        boardName = {this.props.boardName}
        title={`/${this.props.boardAbbr}/ - ${this.props.boardName}`} type="board"/>
        <SearchBar callback={this.onSearchChange.bind(this)} />
        <div id="threadContainer" className="container">
          {threadList}
        </div>
      </div>
    );
  }
}

export default Board;
