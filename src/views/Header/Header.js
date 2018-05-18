import React, { Component } from 'react';
import './Header.css';
import HeaderLinks from './HeaderLinks';
import Banner from '../../components/Banners/Banner.js'

class Header extends Component {

  /* Types are: home, board and thread
  */
  constructor(props) {
    super(props);
    this.modal = React.createRef();
    this.state = {}
  }

  render() {

    return (
      <header>
        <div className="appHeader">
          <HeaderLinks title={this.props.title}/>
          <div id="headerContainer" className="container">
            <div className="item" id="bannerDiv">
              <Banner />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
