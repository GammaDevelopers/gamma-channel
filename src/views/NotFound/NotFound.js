import React, { Component } from 'react';
import BoardHeader from '../../components/Headers/Header';
import image from '../../images/404.png';

class Home extends Component {
  render() {
    const style = {
      maxHeight: "500px"
    };

    return (
      <div>
        <img style={style}alt="Page not found" src={image} />
      </div>
    );
  }
}

export default Home;