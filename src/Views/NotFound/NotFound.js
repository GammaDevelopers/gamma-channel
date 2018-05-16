import React, { Component } from 'react';
import BoardHeader from '../../components/Headers/Header';
import image from '../../images/404.png';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <BoardHeader/>
        <img src={image} />
      </div>
    );
  }
}

export default Home;