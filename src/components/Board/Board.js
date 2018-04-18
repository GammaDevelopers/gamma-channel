import React, { Component } from 'react';
import '../../index.css';
import './Board.css';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import HomeAppBar from '../HomeAppBar/HomeAppBar.js';
import logo from '../../images/logo.png';
import BoardHeader from '../Headers/BoardHeader';
import BoardPost from '../Post/BoardPost';
import {modelInstance} from '../../data/Model';


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
      Promise.all(res.map((thread) => modelInstance.getPost(thread.firstPost)))
        .then(firstPosts => {
          this.setState({
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
           boardAbbr={this.props.boardAbbr}
           boardName={this.props.boardName}
          />
        )
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
