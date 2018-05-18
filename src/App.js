import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './components/Headers/Header';
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
            render={()=> 
            <div className="mainWrapper">
              <Header title={boards.name} type="home"/>
              <Board boardName={boards.name} boardAbbr={boards.abbreviation}/>
            </div>
            }
          />
        )
        routeList.push(<Route path='*' render={ () => 
          <div className="mainWrapper">
            <Header title="404 Page not found" type="home"/>
            <NotFound/>
          </div>
        }/>)
        break;
      default:
        break;
    }

    return (
      <div className="app">
        <Switch>
          <Route exact path='/'>
            <div className="mainWrapper">
              <Header title="Welcome to Gamma Channel" type="home"/>
              <Home/>
            </div>
          </Route>
          <Route path='/:board/:threadID' render={(props) => (
            <div className="mainWrapper">
              <Header title={`Thread ${props.match.params.threadID}`} type="thread"/>
              <Thread threadID={props.match.params.threadID}/>
            </div>
          )}/>
          {routeList}
        </Switch>
      </div>
    );
  }
}

export default App;
