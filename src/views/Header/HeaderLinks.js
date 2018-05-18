import React, { Component } from 'react';
import {modelInstance} from '../../data/Model';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import ActionHome from 'material-ui/svg-icons/action/home';
import HomeButton from '../../components/Buttons/HomeButton/HomeButton'
import ActionHelp from 'material-ui/svg-icons/action/help';
import NewPostModal from '../../components/Dialogs/NewPostModal'


class HeaderLinks extends Component {
  constructor(props) {
    super(props);
    this.modal = React.createRef();
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

  getHomeButton = () => {
    return <div className="item" id="homeButtonDiv"><HomeButton /></div>;
  }

  componentDidMount = () => {
    this.loadBoardLinks();
  }


  render() {
    let boardMenuList = null;

    switch(this.state.status){
      case 'LOADED':
        boardMenuList = this.state.boards.map((board) =>
        <Link key ={board.abbreviation} to={'/'+board.abbreviation}>
          <MenuItem primaryText={board.name}/>
        </Link>
        )
        break;
      default:
        break;
    }

    var appBar =  (
      <AppBar
        style={{backgroundColor:"#484848"}}
        titleStyle={{color:"fullWhite"}}
        title={this.props.title}
        iconElementLeft={
          <div className="container">
            <div className="item">
              <Link to="/">
                <IconButton iconStyle={{fill:"#FFFFFF",float:"right"}}>
                  <ActionHome/>
                </IconButton>
              </Link>
            </div>
            <div className="item">
              <Link to={'/Instructions'}>
                <IconButton iconStyle={{fill:"#FFFFFF",float:"right"}}>
                  <ActionHelp/>
                </IconButton>
              </Link>
            </div>
          </div>}
        iconElementRight={
          <div className="container">
            <div className="item HeaderButtons">
              <IconMenu
                iconButtonElement={
                  <RaisedButton label="+Thread" onClick={()=>{this.modal.current.handleOpen()}}/>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
              </IconMenu>
            </div>
            <div className="item HeaderButtons">
              <IconMenu
                iconButtonElement={
                  <RaisedButton label="Boards">
                  </RaisedButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                {boardMenuList}
              </IconMenu>
            </div>
          </div>
          }
      />
    )

    return (
    <div>
      <div id="linksAppBar">
        {appBar}
      </div>
      <NewPostModal
      ref={this.modal}
      thread="true"
      headText="New Thread"
      titleHintText="Thread tite here..."
      titleLabelText="Thread title *"
      chosenBoardName={this.props.boardName}
      chosenBoardAbbr={this.props.boardAbbr}
      />
    </div>
  )
  }
}

export default HeaderLinks;
