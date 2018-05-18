import React, { Component } from 'react';
import {modelInstance} from '../../data/Model';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Tooltip from '@material-ui/core/Tooltip';
import AppBar from 'material-ui/AppBar';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';


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
    let boardMenuList = null;



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
        boardMenuList = this.state.boards.map((board) =>
        <Link to={'/'+board.abbreviation}>
          <MenuItem primaryText={board.name}/>
        </Link>
        )
        break;
      default:
        boardLinkList = []
        break;
    }

    var appBar =  (
      <AppBar
        style={{backgroundColor:"#484848"}}
        titleStyle={{color:"fullWhite"}}
        title="Boards"
        iconElementLeft={(<div />)}
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton iconStyle={{fill:"#FFFFFF"}} ><MenuIcon/></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            {boardMenuList}
          </IconMenu>}
      />
    )

    return (
    <div>
      <div id="linksAppBar">
        {appBar}
      </div>
      <div id="linksList">
        <span id="linksSpan"> Boards: </span>
        {boardLinkList}
      </div>
    </div>
  )
  }
}

export default HeaderLinks;
