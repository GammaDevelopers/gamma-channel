import React, { Component } from 'react';
import image from '../../images/404.png';
import './NotFound.css';


class Home extends Component {
  render() {
    return (
      <div id="notFoundDiv" className="container">
        <img id="notFoundImg" className="item" alt="Page not found" src={image} />
      </div>
    );
  }
}

export default Home;
