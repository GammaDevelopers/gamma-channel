import React, { Component } from 'react';
import '../../index.css';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <div id="homeContainer" className="container">
          <div id="leftCol" className="item">
            <p>This is the left home screen</p>
          </div>
          <div id="rightCol" className="item">
            <p>This is the right home screen</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
