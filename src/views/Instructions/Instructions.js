import React, { Component } from 'react';
import {Card, CardText} from 'material-ui/Card';
import './Instructions.css';
import HomeAppBar from '../../components/HomeAppBar/HomeAppBar.js';


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
            On the left side this header has a home button that redirects the
            user to the home screen and a help button which navigates to this
            page. On the right side the header has a button for starting new
            threads and a button which links to all the board that are available
            as a dropdown. Beneath the header is a banner image that is chosen
            random (hover for information about creator and rarity!).
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
            by their content. There is a search bar at the top of the boards
            which lets the user search all threads and their posts.
            <br/><br/>

            <strong>Threads</strong><br/>
            When a thread is opened, the user can see the information about the
            first post in the thread and information about the replies in
            the thread. Each post has a reply button on the right side which
            will open a screen for writing a reply. Replies to specific posts
            will link back to the created post, so the users easily can navigate
            the threads. There is also a search bar at the top of the threads
            which lets the user search all posts and their contents.

          </CardText>
        </Card>

        <HomeAppBar title="How to post new threads and replies" />
        <Card className="item InstructionCard" >
          <CardText style={{textAlign:"left"}}>
            New threads can be created by pressing the "+THREAD" button in the
            header. This button will open a new page where information about
            the thread can be added. Replies can be created by pressing the
            "Reply" button on any post, which will open a similar new page with
            information about the post.
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
            posts! Many <i>markdown</i> features are also supported. Here is a
            list of the most popular commands: <br/><br/>

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
