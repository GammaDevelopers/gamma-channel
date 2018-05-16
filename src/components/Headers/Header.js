import React, { Component } from 'react';
import '../../index.css';
import './Header.css';
import HeaderLinks from './HeaderLinks';
import HomeButton from '../Buttons/HomeButton';
import NewThreadModal from './../Dialogs/NewThreadModal'
import Banner from '../Banners/Banner.js'
import BadgeNotification from '../Badge/BadgeNotification';

class Header extends Component {

  /* Types are: home, board and thread
  */
  constructor(props) {
    super(props);
    this.state = {}
  }

  getHomeButton = () => {
    if (this.props.type !== 'home') {
      return <div className="item" id="homeButtonLarge"><HomeButton /></div>;
    } else {
      return <div />
    }
  }

  render() {
    return (
      <header>
        <div className="appHeader">
          <HeaderLinks/>
          <div id="headerContainer" className="container">
            {this.getHomeButton()}
            <div className="item" id="bannerDiv">
              <Banner />
            </div>
            <div className="item" id="newPostBtnLarge">
              <NewThreadModal chosenBoard={this.props.name}/>
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
              <NewThreadModal chosenBoard={this.props.name}/>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
