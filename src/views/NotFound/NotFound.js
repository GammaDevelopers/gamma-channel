import React, { Component } from 'react';
import BoardHeader from '../../components/Headers/Header';
import image from '../../images/404.png';

class Home extends Component {
  render() {
    return (
      <div>
        <BoardHeader/>
        <img alt="Page not found" src={image} />
      </div>
    );
  }
}

export default Home;