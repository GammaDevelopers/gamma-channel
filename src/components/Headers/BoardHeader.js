import React, { Component } from 'react';
import '../../index.css';
import Paper from 'material-ui/Paper';
import './BoardHeader.css';
import HeaderLinks from './HeaderLinks';
import HomeButton from '../Buttons/HomeButton';
import logo from '../../images/logo.png';
import NewThreadModal from './../Dialogs/NewThreadModal'
import IconButton from 'material-ui/IconButton';
import homeIcon from '../../images/homeIcon.png';
import FontIcon from 'material-ui/FontIcon';
import Banner from '../Banners/Banner.js'
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';


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
