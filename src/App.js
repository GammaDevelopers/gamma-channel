import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Thread from './components/Thread/Thread';
import Board from './components/Board/Board';
import {modelInstance} from './data/Model';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      boards: []
    };
  }

  loadRoutes(){
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
    this.loadRoutes();
  }

  render() {
    let routeList = [];
    console.log(this.state);
    switch(this.state.status){
      case 'LOADED':
        routeList = this.state.boards.map((boards) =>
          <Route
            exact path={`/${boards.abbreviation}`}
            key={boards.abbreviation}
            render={()=> <Board boardName={boards.name} boardAbbr={boards.abbreviation}/>}
          />
        )
        break;
    }
    console.log(this.state.boards);

    return (
      <div className="app">
        <Route exact path='/' component={Home}/>
        <Route path='/:board/:threadID' component={Thread}/>
        <Route path='/board' component={Board}/>
        {routeList}
      </div>
    );
  }
}

export default App;
