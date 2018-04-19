import React, { Component } from 'react';
import '../../index.css';
import './BoardHeader.css';
import HeaderLinks from './HeaderLinks';
import HomeButton from '../Buttons/HomeButton';
import NewThreadModal from './../Dialogs/NewThreadModal'
import Banner from '../Banners/Banner.js'


class BoardHeader extends Component {


  constructor(props) {
    super(props);
    this.state = { }
  }
  render() {
    return (
      <header>
        <HeaderLinks/>
        <div className="appHeader">
          <div id="headerContainer" className="container">
            <div className="item">
              <HomeButton />
            </div>
            <div className="item" id="bannerDiv">
              <Banner />
            </div>
            <div className="item" id="newPostBtn">
              <NewThreadModal />
            </div>
          </div>
          <div>
            <h1 className="appTitle">/{this.props.abbreviation}/ - {this.props.name}</h1>
          </div>
        </div>
      </header>
    );
  }
}

export default BoardHeader;
