import React, { Component } from 'react';
import '../../index.css';
import './Board.css';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import HomeAppBar from '../HomeAppBar/HomeAppBar.js';
import logo from '../../images/logo.png';
import BoardHeader from '../Headers/BoardHeader';
import BoardPost from '../Post/BoardPost';
import {modelInstance} from '../../data/Model';
import ContentLoader from "react-content-loader"

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

  componentDidMount = () => {
    this.loadThreads();
  }

  render() {
    let threadList = null;
    const MyLoader = () => (
      <div id="threadLoader">
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
          <BoardPost
           key={post.id}
           userName={post.name}
           postNumber={post.id}
           timeStamp={post.created}
           postTitle={post.title}
           text={post.content}
           mediaURL={post.mediaURL}
           replyCount={post.replyCount}
           boardAbbr={this.props.boardAbbr}
           boardName={this.props.boardName}
           replyCount={post.replyCount}
          />
        )
        break;
      default:
      threadList = [MyLoader(),MyLoader(),MyLoader(),MyLoader()]
        break;
    }
    return (
      <div>
        <BoardHeader abbreviation={this.props.boardAbbr} name={this.props.boardName}/>
        <div id="threadContainer" className="container">
          {threadList}
        </div>
      </div>
    );
  }
}

export default Board;
