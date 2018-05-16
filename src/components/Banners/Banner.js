import React, { Component } from 'react';
import '../../index.css';
import './Banner.css';
import {modelInstance} from '../../data/Model';
import Tooltip from '@material-ui/core/Tooltip';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      description: null,
    }
  }

  componentDidMount(){
    modelInstance.getHeaderImage().then((banner) => {
      this.setState({'image':banner.image,
      'description': `Banner Creator: ${banner.submitter}
      id: ${banner.id} tickets: ${banner.weight}`})
  })
  }

  render() {
    if (this.state.image !== null ) {
      return (
        <div>
          <Tooltip variant='fab' color='primary' title={this.state.description}>
          <img className="banner" src={this.state.image}
                              alt={this.state.description} />
          </Tooltip>
        </div>
      );
    }else{
      return (<div></div>)
    }
  }
}

export default Banner;
