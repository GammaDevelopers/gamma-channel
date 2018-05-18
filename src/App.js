import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './views/Home/Home';
import Thread from './views/Thread/Thread';
import Board from './views/Board/Board';
import {modelInstance} from './data/Model';
import NotFound from './views/NotFound/NotFound';


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
    switch(this.state.status){
      case 'LOADED':
        routeList = this.state.boards.map((boards) =>
          <Route
            exact path={`/${boards.abbreviation}`}
            key={boards.abbreviation}
            render={()=> <Board boardName={boards.name} boardAbbr={boards.abbreviation}/>}
          />
        )
        routeList.push(<Route path='*' component={NotFound} />)
        break;
      default:
        break;
    }

    return (
      <div className="app">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/:board/:threadID' component={Thread}/>
          <Route path='/board' component={Board}/>
          {routeList}
        </Switch>
      </div>
    );
  }
}

export default App;
