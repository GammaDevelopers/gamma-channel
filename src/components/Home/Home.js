import React, { Component } from 'react';
import '../../index.css';
import './Home.css';
import HomeCard from '../HomeCard/HomeCard.js';
import HomeAppBar from '../HomeAppBar/HomeAppBar.js';
import AppHeader from '../Headers/AppHeader';
import {modelInstance} from '../../data/Model';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    status: 'INITIAL',
    boards: []
    }
  }

  loadBoards() {
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
    this.loadBoards();
  }

  render() {
    let boardList = null;

    switch(this.state.status){
      case 'LOADED':
        boardList = this.state.boards.map((board) =>
          <HomeCard
          key={board.abbreviation}
          title={board.name}
          boardAbbr={board.abbreviation}
          subtitle={board.description}
          cardText="DESCRIPTION PLACEHOLDER"
          on
          />
        )
        break;
    }
    return (
      <div>
      <AppHeader/>

      <div id="rootDiv">
        <div id="homeContainer" className="container">
          <div id="boardContainer" className="container">
            <HomeAppBar title="Boards"/>
            {boardList}
          </div>
          <div id="newsContainer" className="container">
            <HomeAppBar title="News"/>
           <HomeCard title="Gamma chan is now under development!"
           subtitle="Gamma developers are working hard" cardText="Help me out fam"/>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Home;
