import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import './Post.css';


export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  loadReplies(){
  }

  componentDidMount = () => {
    //Highlight code 
    var current = ReactDOM.findDOMNode(this);
    let query = current.querySelectorAll('pre code');
    for (let code of query) {
      window.hljs.highlightBlock(code);
    }
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = () => {
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
      case true:
        postImage =
          <div id="imgDivExpanded" onClick={() => this.handleToggle()}>
            <img align="left" className="postImgExpanded" src={this.props.mediaURL}  alt="" />
          </div>
          break;
      default:
        postImage =
          <div id="imgDiv" onClick={() => this.handleToggle()}>
            <img align="left" className="postImg" src={this.props.mediaURL} alt="" />
          </div>
        break;
    }
    return (
      <div id={this.props.postID} className="post">
        <Card align="left" expanded={this.state.expanded} onExpandChange={this.handleExpandChange} style={{
      backgroundColor: '#404040'}}>
          <div id="replyPostHead" className="container">
            <CardHeader
            style={{top:-10,left:-5}}
              title={this.props.postTitle}
              subtitle={`No. ${this.props.postID}, ${this.props.userName}, ${this.props.timeStamp}`}
            />
            <div className="item" id="replyBtn">
              <RaisedButton label="Reply" onClick={()=>{this.props.replyCallback(this.props.postID)}}/>
            </div>
          </div>

          <CardMedia>
            <div className="container">
              {postImage}
              <CardText  style={{paddingTop:0}} dangerouslySetInnerHTML={this.props.text}></CardText>
            </div>
          </CardMedia>
        </Card>
      </div>
    );
  }
}
