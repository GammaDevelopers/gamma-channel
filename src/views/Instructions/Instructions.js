import React, { Component } from 'react';
import ContentLoader from "react-content-loader";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import './Instructions.css';
import HomeCard from '../../components/HomeCard/HomeCard.js';
import HomeAppBar from '../../components/HomeAppBar/HomeAppBar.js';
import Header from '../Header/Header'
import {modelInstance} from '../../data/Model';


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
      <div id="instructionContainer" className="container">
        <HomeAppBar title="How to navigate Gamma Channel" />
        <Card className="item InstructionCard">
          <CardText style={{textAlign:"left"}}>
            <strong>Header</strong><br/>
            Gamma Channel features a header on the top of the page at all times.
            This header includes a list of links to all of the boards that are
            available for fast navigation. The header also has a home button
            that redirects the user to the home screen, a banner image that is
            chosen at random (hover for information about creator and rarity!)
            and a button for starting new threads.
            <br/><br/>

            <strong>Home</strong><br/>
            From the home screen visitors can view all the discussion boards
            on the left hand side, and the latest news from the Gamma Channel
            Developers on the right hand side. A board card is clickable and
            redirects the page to the corresponding board screen. A news card is
            clickable and will open the thread for the corresponding news post.
            Users can comment on how they feel about new updates by the Gamma
            Channel Developers.
            <br/><br/>

            <strong>Boards</strong><br/>
            On the board screen users can view all the threads in the
            selected board and click on the header to open the thread. The top
            of the board page features a search bar that can filter threads
            by their content.
            <br/><br/>

            <strong>Threads</strong><br/>
            When a thread is opened, the user can see the information about the
            first post in the thread and information about the replies in
            the thread. Each post has a reply button on the right side which
            will open a screen for writing a reply. Replies to specific posts
            will link back to the created post, so the users can easily navigate.

          </CardText>
        </Card>

        <HomeAppBar title="How to post new threads and replies" />
        <Card className="item InstructionCard" >
          <CardText style={{textAlign:"left"}}>
            New threads can be created by pressing the "+THREAD" button on the
            top of the page, inside the header. This button will open a new page
            where information about the thread can be added. Replies can be
            created by pressing the "Reply" button on any post, which will open a
            similar new page with information about the post.
            <br/><br/>

            <strong>Attributes</strong><br/>
            This includes a title and the details about the topic/question/post.
            A new thread also has a dropdown for choosing a board to post the new
            thread in. To add a post or new thread, a user must also fill in the
            reCaptcha (so that Gamma Channel will persist through bot attacks!).
            Adding a username is optional (anonymous posting is fully allowed),
            and images can be added (encouraged!). Press submit when the
            information is filled in, and behold the freshly created thread/reply!
            <br/><br/>

            <strong>How to tweak posts!</strong><br/>
            There are several commands which can be used to tweak text in thread
            posts! <i>Markdown</i> is also supported. Here is a list of the most
            popular commands: <br/><br/>

            <i>Spoilers</i>: spoilers can be added by writing
            [spoiler][spoiler text].<br/><br/>

            <i>Green text</i>: green text can be added by writing >text to turn
            green.<br/><br/>

            <i>Code</i>: code can be added by surrounding the code block with
             ```.<br/><br/>

            <i>Tables</i>: tables can be created by using several | for vertical
            bars and several - for horizontal lines. <br/><br/>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default Instructions;
