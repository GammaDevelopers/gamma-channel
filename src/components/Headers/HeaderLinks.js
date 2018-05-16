import React, { Component } from 'react';
import {modelInstance} from '../../data/Model';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Tooltip from '@material-ui/core/Tooltip';

class HeaderLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
    status: 'INITIAL',
    boards: []
    }
  }

  loadBoardLinks() {
    modelInstance.getAllBoards().then(res => {
      this.setState({
        status: 'LOADED',
        boards: res
      })
      }).catch(() => {
      this.setState({
        status: 'ERROR',
        boards: []
      })
    });
  }

  componentDidMount = () => {
    this.loadBoardLinks();
  }


  render() {
    let boardLinkList = null;

    switch(this.state.status){
      case 'LOADED':
        boardLinkList = this.state.boards.map((board) =>
          <Tooltip key={board.abbreviation} variant='fab' color='primary' title={board.name}>
            <Link to={'/'+board.abbreviation}
            style={{ textDecoration: 'none'}}>
              <RaisedButton overlayStyle={{color: 'white'}} title={board.name}>
                {board.abbreviation}
              </RaisedButton>
            </Link>
          </Tooltip>
        )
        break;
      default:
        boardLinkList = []
        break;
    }

    return (
    <div id="links">
      <span> Boards: </span>
      {boardLinkList}
    </div>)
  }
}

export default HeaderLinks;
