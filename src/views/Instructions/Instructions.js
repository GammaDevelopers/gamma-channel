import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import './Instructions.css';
import HomeCard from '../../components/HomeCard/HomeCard.js';
import HomeAppBar from '../../components/HomeAppBar/HomeAppBar.js';
import Header from '../Header/Header'
import {modelInstance} from '../../data/Model';
import ContentLoader from "react-content-loader";

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount = () => {
  }

  render() {
    return (
      <div id="rootDiv">
        <Card>
          <CardHeader
            title="How to navigate Gamma Channel"
            subtitle="For degenerates"/>
          <CardText style={{textAlign:"left"}}>
            <strong>Header</strong><br/>
            Gamma Channel features a header on the top of the page at all times.
            This header inclueds a list of links to all of the boards that are
            available
            <br/><br/>
            <strong>Home</strong><br/>
            From the home screen visitors can view all the discussion boards
            on the left hand side, and the latest news from the Gamma Channel
            Developers on the right hand side. A board card is clickable and
            redirect the page to the corresponding board. A news card is
            clickable and will open the thread for the corresponding news post.
            <br/><br/>
            <strong>Board</strong><br/>
            On the board screen users can view all the threads in the
            selected board and click on the header to open the thread. The top
            of the board page features a search bar that can fitler threads
            by their content.


          </CardText>
        </Card>
        <Card>
        <CardHeader
          title="How to post new threads"
          subtitle="For degenerates"/>
        <CardText>

        </CardText>
      </Card>

      <Card>
        <CardHeader
          title="How to post replies"
          subtitle="For degenerates"/>
        <CardText>

        </CardText>
      </Card>

      </div>
    );
  }
}

export default Instructions;
