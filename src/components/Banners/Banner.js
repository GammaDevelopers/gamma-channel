import React, { Component } from 'react';
import '../../index.css';
import './Banner.css';
import testBanner from '../../images/testBanner.png';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }
  render() {
    return (
      <div>
        <img id="banner" src={testBanner} className="testBanner" alt="testBanner" />
      </div>
    );
  }
}

export default Banner;
