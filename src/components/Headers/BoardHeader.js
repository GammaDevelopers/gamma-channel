import React, { Component } from 'react';
import '../../index.css';
import './BoardHeader.css';
import HeaderLinks from './HeaderLinks';
import HomeButton from '../Buttons/HomeButton';
import NewPostModal from './../Dialogs/NewPostModal'
import Banner from '../Banners/Banner.js'


class BoardHeader extends Component {


  constructor(props) {
    super(props);
    this.state = { }
  }
  render() {
    var postModalInstance = (
      <div>
        <NewPostModal
        buttonText = "+ Thread"
        headText="New Thread"
        chosenBoardName={this.props.boardName}
        chosenBoardAbbr={this.props.boardAbbr}
        />
      </div>
    )

    return (
      <header>
        <div className="appHeader">
          <HeaderLinks/>
          <div id="headerContainer" className="container">
            <div className="item" id="homeButtonLarge">
              <HomeButton />
            </div>
            <div className="item" id="bannerDiv">
              <Banner />
            </div>
            <div className="item" id="newPostBtnLarge">
              {postModalInstance}
            </div>
          </div>
          <div>
            <h1 className="appTitle">{this.props.title}</h1>
          </div>
          <div id="smallDiv" className="container">
            <div className="item" id="homeButtonSmall">
              <HomeButton />
            </div>
            <div className="item" id="newPostBtnSmall">
              {postModalInstance}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default BoardHeader;
