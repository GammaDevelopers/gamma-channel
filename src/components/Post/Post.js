import React from 'react';
import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import './Post.css';


export default class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = () => {
    console.log(this.state.expanded);
    if(this.state.expanded === false){
      this.handleExpand();
    }else{
      this.handleReduce();
    }
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  render() {
    let postImage = null;
    switch(this.state.expanded){
      case false:
        postImage =
          <div id="imgDiv" onClick={() => this.handleToggle()}>
            <img align="left" id="postImg" src={this.props.mediaURL} alt="" />
          </div>
        break;
      case true:
        postImage =
          <div id="imgDivExpanded" onClick={() => this.handleToggle()}>
            <img align="left" id="postImg" src={this.props.mediaURL}  alt="" />
          </div>
          break;
    }
    return (
      <div id="post">
        <Card align="left" expanded={this.state.expanded} onExpandChange={this.handleExpandChange} style={{
      backgroundColor: '#404040'}}>
          <CardHeader
          style={{top:-10,left:-5}}
            title={this.props.postTitle}
            subtitle={`No. ${this.props.postID}, ${this.props.userName}, ${this.props.timeStamp}`}
          />

          <CardMedia>
            <div className="container">
              {postImage}
              <CardText>{this.props.text}</CardText>
            </div>
          </CardMedia>
        </Card>
      </div>
    );
  }
}
