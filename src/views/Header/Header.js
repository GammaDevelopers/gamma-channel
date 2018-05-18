import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import HeaderLinks from './HeaderLinks';
import HomeButton from '../../components/Buttons/HomeButton';
import NewPostModal from '../../components/Dialogs/NewPostModal'
import Banner from '../../components/Banners/Banner.js'
import RaisedButton from 'material-ui/RaisedButton';


class Header extends Component {

  /* Types are: home, board and thread
  */
  constructor(props) {
    super(props);
    this.state = {}
  }

  getHomeButton = () => {
    if (this.props.type !== 'home') {
      return <div className="item" id="homeButtonDiv"><HomeButton /></div>;
    } else {
      return <div />
    }
  }

  render() {
    var postModalInstance = (
      <div>
        <NewPostModal
        thread="true"
        buttonText = "+Thread"
        headText="New Thread"
        titleHintText="Thread tite here..."
        titleLabelText="Thread title *"
        chosenBoardName={this.props.boardName}
        chosenBoardAbbr={this.props.boardAbbr}
        />
      </div>
    )

    var helpButton = (
      <Link to={'/Instructions'}>
        <RaisedButton
          overlayStyle={{color: 'white'}}
          label='HELP'
          style={{width: '94px', marginLeft:"5px",marginRight:"5px"}}>
        </ RaisedButton>
      </Link>
    )

    return (
      <header>
        <div className="appHeader">
          <HeaderLinks/>
          <div id="headerContainer" className="container">
            <div id="homeButtonLarge">
              {this.getHomeButton()}
            </div>
            <div className="item" id="bannerDiv">
              <Banner />
            </div>
            <div className="item" id="buttonsLarge">
              {postModalInstance}
              {helpButton}
            </div>
          </div>
          <div>
            <h1 className="appTitle">{this.props.title}</h1>
          </div>
          <div id="smallDiv" className="container">
            <div className="item" id="homeButtonSmall">
              {this.getHomeButton()}
            </div>
            <div className="item" id="buttonsSmall">
              {postModalInstance}
              {helpButton}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
