import React, { Component } from 'react';
import ContentLoader from "react-content-loader"
import './Home.css';
import HomeCard from '../../components/HomeCard/HomeCard.js';
import HomeAppBar from '../../components/HomeAppBar/HomeAppBar.js';
import Board from '../Board/Board'
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
    const MyLoader = (key) => (
      <div key={key} id="homeLoader">
      	<ContentLoader
      		height={400}
      		width={1920}
      		speed={2}
          primaryColor="#a4a4a4"
  		    secondaryColor="#ecebeb">
      		<rect x="0" y="0" rx="0" ry="0" width="1920" height="400" />
      	</ContentLoader>
      </div>
    )

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
      case 'ERROR':
        boardList = (<div className="alert alert-error"> Failed to load threads </div>)
        break;
      default:
        boardList = [MyLoader(1),MyLoader(2),MyLoader(3),MyLoader(4)]
        break;
    }
    return (
      <div>
      <div id="rootDiv">
        <div id="homeContainer" className="container">
          <div id="boardContainer" className="container item">
            <HomeAppBar title="Boards"/>
            {boardList}
          </div>
          <div id="newsContainer" className="container item">
            <HomeAppBar title="News"/>
            <Board boardName="News" noSearch={true} boardAbbr="b"/>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Home;
