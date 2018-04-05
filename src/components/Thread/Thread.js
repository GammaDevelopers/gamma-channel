import React, { Component } from 'react';
import '../../index.css';
import Paper from 'material-ui/Paper';
import BoardHeader from '../BoardHeader/BoardHeader'
import './Thread.css';


class Thread extends Component {
  constructor(props) {
  super(props);
  this.state = { shadow: 1 }
}

onMouseOver = () => this.setState({ shadow: 4 });
onMouseOut = () => this.setState({ shadow: 1 });

  render() {
    return (
        <div>
          <BoardHeader abbreviation="test" name="test2"/>
          <div id="thread" className="">
            <Paper />
          </div>
        </div>
    );
  }
}

export default Thread;
