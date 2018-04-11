import React, { Component } from 'react';
import '../../index.css';
import './Board.css';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import HomeAppBar from '../HomeAppBar/HomeAppBar.js';
import logo from '../../images/logo.png';
import BoardHeader from '../Headers/BoardHeader';
import Post from '../Post/Post';


class Board extends Component {
  constructor(props) {
  super(props);
}

  render() {
    return (
      <div>
        <BoardHeader abbreviation="rg" name="Ruined General"/>
        <div id="threadContainer" className="container">
          <Post userName="Simon" postTitle="Title of Simon's post" timeStamp="Simon's timestamp" text="Lorem ipsum etc 1"/>
          <Post userName="Alexander" postTitle="Title of Alexander's post" timeStamp="Alexander's timestamp" text="Lorem ipsum etc 2"/>
          <Post userName="Victoria" postTitle="Title of Victoria's post" timeStamp="Victoria's timestamp" text="Lorem ipsum etc 3"/>
        </div>
      </div>
    );
  }
}

export default Board;
