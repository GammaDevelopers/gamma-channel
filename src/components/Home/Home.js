import React, { Component } from 'react';
import '../../index.css';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './Home.css';
import HomeCard from '../HomeCard/HomeCard.js';
import HomeAppBar from '../HomeAppBar/HomeAppBar.js';
import logo from '../../images/logo.png';



class Home extends Component {
  constructor(props) {
  super(props);
  // this.state = { shadow: 1 }
}

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Gamma Channel!</h1>
      </header>

      <div id="rootDiv">
        <div id="homeContainer" className="container">
          <div id="boardContainer" className="container">
            <HomeAppBar title="Boards"/>
            <HomeCard title="Ruined General" subtitle="shitPOST" cardText=
            "This is where all the shit happens"/>

            <HomeCard title="Anime/Manga" subtitle="Weebshit and other disgusting stuff"
            cardText= "Discuss anime and manga with your favorite degenerates"/>

            <HomeCard title="Programming" subtitle="Dev hours" cardText=
            "Get productive and make game"/>

            <HomeCard title="Placeholder" subtitle="Placeholder" cardText=
            "Placeholder Placeholder Placeholder Placeholder Placeholder"/>

            <HomeCard title="Placeholder" subtitle="Placeholder" cardText=
            "Placeholder Placeholder Placeholder Placeholder Placeholder"/>

            <HomeCard title="Placeholder" subtitle="Placeholder" cardText=
            "Placeholder Placeholder Placeholder Placeholder Placeholder"/>

          </div>
          <div id="newsContainer" className="container">
            <HomeAppBar title="News"/>
           <HomeCard title="Gamma chan is now under development!"
           subtitle="Gamma developers are working hard" cardText="Help me out fam"/>
          </div>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Home;
