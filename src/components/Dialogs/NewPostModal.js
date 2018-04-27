import React from 'react';
import Dialog from 'material-ui/Dialog';
import './Modals.css'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import LinearProgress from 'material-ui/LinearProgress';
import logo from '../../images/logo.png'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import {modelInstance} from '../../data/Model';
import {mediaInstance} from '../../data/MediaUpload'
import Dropzone from '../Buttons/dropzone'


/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class DialogExampleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      userName: '',
      text: '',
      board: props.chosenBoard,
      boards: [],
      image: "",
      threadID: 0,
      postID: 0,
      progress: -2,
      status: 'INITIAL',
      postSucc: false
    }
  }

  loadBoards() {
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

  myCallback(){
    this.props.callBackFunc()
  }

  componentDidMount = () => {
    this.loadBoards();
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleBoardChange = (event, index, board) => {
    this.setState({board})
  };

  handleUserNameChange = (event) => {
    this.setState({userName: event.target.value})
  };

  handleTitleChange = (event) => {
    this.setState({title: event.target.value})
  };

  handleTextChange = (event) => {
    this.setState({text: event.target.value})
  };

  createPostReply = (postData) => {
    return (modelInstance.postReply(this.props.postNumber,postData)
    .then( (postID) => {
      this.setState({postID: postID})
      return(postID)
    }).catch( (err) => {
      //Todo: Handle post error
      alert("Failed to create post" + err)
    }))
  }

  handleSubmit = () =>{
    var textSucc = false;
    var titleSucc = true;
    if(this.state.text != ""){
      textSucc = true;
    }
    if(textSucc && titleSucc){
      if(this.state.image != ""){
        this.setState({progress: 0})
        mediaInstance.imgurUpload(this.state.image, (frac) => {
          this.setState({progress: 100*frac})
          console.log(this.state.progress)
        }, (response) => {
          //Todo handle fail
          alert(response)
        }, (mediaURL) => {
          console.log(mediaURL)
          var postData = modelInstance.generatePostData(this.state.title,this.state.userName,this.state.text, "", mediaURL);
          this.createPostReply(postData).then(() => {
            this.setState({
              postSucc: true
            })
            this.props.callBackFunc()
            this.handleClose()
          }
        )


        })
      }else{
        var postData = modelInstance.generatePostData(this.state.title,this.state.userName,this.state.text,"");
        this.createPostReply(postData).then((res) =>
        console.log(res),
        this.setState({
          postSucc: true
        }),
        this.props.callBackFunc(),
        this.handleClose()

      )
      }
    }
  }

  render() {
    let boardList = null;
    let submitBool = true;
    var myPostID = this.state.postID;


    if(this.state.text.length != 0 ){
      submitBool = false;
    }else{
      submitBool = true;
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={submitBool}
        onClick={this.handleSubmit}
      />,
    ];


    return (
      <div>
        <RaisedButton label="Reply" onClick={this.handleOpen} />
        <Dialog
          title="Reply to post"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div className="container">
            <Dropzone onImageChange={(img)=>this.setState({image:img})}/>
            <div>
              <TextField onChange={this.handleUserNameChange}
                hintText="Username (optional)"
                floatingLabelText="Username"
                maxLength="25"
              />
              <TextField onChange={this.handleTitleChange}
                hintText="Post title here..."
                floatingLabelText="Post title"
                maxLength="50"
              />
              <div id="reCaptchaPlaceholder"></div>
            </div>
            <div>
            </div>
          </div>
          <div id="textBox">
            <TextField onChange={this.handleTextChange}
              hintText="Thread starter here..."
              floatingLabelText="Your post *"
              multiLine={true}
              fullWidth={true}
              rows={2}
              maxLength="1000"
            />
          </div>
          <p> * Required </p>
          {this.state.progress > -2 &&
            <LinearProgress mode={this.state.progress <= 0 ? "indeterminate" : "determinate" }
            value={this.state.progress} />
          }

        </Dialog>
      </div>
    );
  }
}