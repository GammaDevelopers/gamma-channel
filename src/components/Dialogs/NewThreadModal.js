import React from 'react';
import Dialog from 'material-ui/Dialog';
import './NewThreadModal.css'
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
      progress: -2,
      status: 'INITIAL'
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

  createTread = (postData) => {
    modelInstance.createThread(this.state.board,postData)
    .then( (threadID) => {
      console.log("Created thread with id: " + threadID)
      this.setState({threadID: threadID})
    }).catch( (err) => {
      //Todo: Handle post error
      alert("Failed to create thread" + err)
    })
  }

  handleSubmit = () =>{
    var titleSucc = false, textSucc = false;
    if(this.state.title != ""){
      titleSucc = true;
    }
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
          this.createTread(postData)
        })

      }else{
        var postData = modelInstance.generatePostData(this.state.title,this.state.userName,this.state.text,"");
        this.createTread(postData)
      }
    }
  }

  render() {
    let boardList = null;
    let submitBool = true;

    console.log(this.state);

    if(this.state.text.length != 0 ){
      if(this.state.title.length != 0){
        submitBool = false;
      }else{
        submitBool = true;
      }
    }else{
      submitBool = true;
    }

    switch(this.state.status){
      case 'LOADED':
        boardList = this.state.boards.map((board) =>
          <MenuItem value={board.name} primaryText={board.name}/>
        )
        break;
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
        <RaisedButton label="+ Thread" onClick={this.handleOpen} />
        <Dialog
          title="New Thread"
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
                hintText="Thread title here..."
                floatingLabelText="Thread title *"
                maxLength="50"
              />
              <div id="reCaptchaPlaceholder"></div>
            </div>
            <div>
              <DropDownMenu value={this.state.board} onChange={this.handleBoardChange}>
                {boardList}
              </DropDownMenu><br />
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
          {this.state.threadID != 0 &&
            <div>
              <span> Thread Created sucessfully </span>
              {/*Todo: fix for other boards to */}
              <Link to={`/comf/${this.state.threadID}`}>
                <RaisedButton label="Go to thread" primary={true} />
              </Link>
            </div>
          }
        </Dialog>
      </div>
    );
  }
}
