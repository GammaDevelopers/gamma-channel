import React, { Component } from 'react';
import '../../index.css';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import './HomeCard.css';
import { Link } from 'react-router-dom';

class HomeCard extends Component {
  constructor(props) {
    super(props);
    this.state = { shadow: 1,
      boardRoute: ""
    }

    if(this.props.boardAbbr != null){
      this.state= {
        boardRoute: `/${this.props.boardAbbr}`
      };
      console.log(this.state.boardRoute);
    }
  }

  onMouseOver = () => this.setState({ shadow: 4 });
  onMouseOut = () => this.setState({ shadow: 1 });

  render() {
    return (
      <Link to={this.state.boardRoute}>
        <div id="board" className="item">
          <Card onMouseOver={this.onMouseOver}
           onMouseOut={this.onMouseOut}
           zDepth={this.state.shadow}>
            <CardTitle align="left"
              title={this.props.title}
              subtitle={this.props.subtitle}
              style={{top:-10}}
             />
            <div className="container">
              <img align="left" id="boardImg" src="http://localhost:3000/static/media/logo.f808e9eb.png" alt="" />
              <CardText align="left">{this.props.cardText}</CardText>
            </div>
          </Card>
        </div>
      </Link>
    );
  }
}

export default HomeCard;
