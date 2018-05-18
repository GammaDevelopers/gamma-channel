import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Card, CardHeader} from 'material-ui/Card';
import './HomeCard.css';
import theImage from '../../images/logo.png';


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
    }
  }

  onMouseOver = () => this.setState({ shadow: 4 });
  onMouseOut = () => this.setState({ shadow: 1 });

  render() {
    return (
      <Link to={this.state.boardRoute}>
        <div id="board" className="item">
          <Card
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
            zDepth={this.state.shadow}>
            <CardHeader align="left" className="postHead"
              title={this.props.title}
              subtitle={this.props.subtitle}
            />
            <div className="container">
              <img align="left" id="boardImg" src={theImage} alt="" />
            </div>
          </Card>
        </div>
      </Link>
    );
  }
}

export default HomeCard;
