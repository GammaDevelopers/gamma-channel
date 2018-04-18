import React, { Component } from 'react';
import '../../index.css';
import './Board.css';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import HomeAppBar from '../HomeAppBar/HomeAppBar.js';
import logo from '../../images/logo.png';
import BoardHeader from '../Headers/BoardHeader';
import BoardPost from '../Post/BoardPost';

class Board extends Component {
  constructor(props) {
  super(props);
  }


  render() {
    return (
      <div>
        <BoardHeader abbreviation="rg" name="Ruined General"/>
        <div id="threadContainer" className="container">
          <BoardPost userName="Simon" postNumber="No.123123213"
           postTitle="Title of Simon's post" timeStamp="Simon's timestamp" text="Lorem ipsum etc 1"/>
          <BoardPost userName="Alexander"
           postTitle="Title of Alexander's post" timeStamp="Alexander's timestamp" text="Lorem ipsum etc 2"/>
          <BoardPost userName="Victoria"
          postTitle="Title of Victoria's post" timeStamp="Victoria's timestamp" text="Lorem ipsum etc 3"/>
        </div>
      </div>
    );
  }
}

export default Board;
