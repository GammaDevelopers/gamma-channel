import React from 'react';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import './NewPostModal.css'
import Dropzone from '../Dropzone/Dropzone'
import {modelInstance} from '../../data/Model';
import {mediaInstance} from '../../data/MediaUpload'
var Recaptcha = require('react-recaptcha');


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
      captcha: false,
      captchaResponse: '',
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
    this.setState({board:this.props.chosenBoardName});
    this.loadBoards();

  }

  handleOpen = () => {
    this.setState({open: true});
    if(this.props.postNumber !== undefined){
      this.setState({text:'#'+this.props.postNumber+" "});
    }
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

  createThreadOuter = (postData) => {
    modelInstance.createThread(this.state.board,postData,this.state.captchaResponse)
    .then( (threadID) => {
      this.setState({threadID: threadID})
    }).catch( (err) => {
      //Todo: Handle post error
      alert("Failed to create thread" + err)
    })
  }

  // specifying captcha verify callback function
  verifyCallback = (response) => {
    this.setState({captcha: true,
      captchaResponse: response})
  };

  createPostReply = (postData) => {
    return (modelInstance.postReply(this.props.threadNumber,postData, this.state.captchaResponse)
    .then( (postID) => {
      return(postID)
    }).catch( (err) => {
      //Todo: Handle post error
      alert("Failed to create post" + err)
    }))
  }
  /* Returns a promise with properties:
  *  Resolves to emtpy string if no image specified
  *  Resolves to url if image upploaded sucessfully
  *  Rjected if image uppload failed
  */
  upploadImage = () =>{
    return new Promise((resolve, reject) => {
      if(this.state.image !== "") {
        this.setState({progress: 0})
        mediaInstance.imgurUpload(this.state.image, (frac) => {
          this.setState({progress: 100*frac})
        }, (response) => {
          reject(response)
        }, (mediaURL) => {
            resolve(mediaURL)
        })
      }else {
        resolve("")
      }
    });
  }

  handleSubmit = () => {
    var titleSucc = false, textSucc = false, validPost = false;
    if(this.state.title !== "") {
      titleSucc = true;
    }
    if(this.state.text !== "") {
      textSucc = true;
    }

    if(this.props.thread === "false" && textSucc){
      validPost = true;
    }else if(titleSucc && textSucc){
      validPost = true;
    }

    if(validPost && this.state.captcha){
      this.upploadImage().then( (mediaURL) => {
        var postData = modelInstance.generatePostData(this.state.title,this.state.userName,this.state.text, "", mediaURL);
        if(this.props.thread === "false"){
          return this.createPostReply(postData).then((postID) => {
            this.props.callBackFunc(postID)
            this.handleClose();
          });
        }else{
          return this.createThreadOuter(postData);
        }
      }).catch((err) => alert(`Failed to create post: ${err}`))
    }
  }

  render() {
    let boardList = null;
    let disabledBool = true;

    if(this.props.thread === "false"){
      if(this.state.text.length !== 0
        && this.state.captcha === true
      ) {
          disabledBool = false;

      } else {
        disabledBool = true;
      }
    }else{
      if(this.state.text.length !== 0
        && this.state.title.length !== 0
        && this.state.captcha === true
      ) {
          disabledBool = false;

      } else {
        disabledBool = true;

      }
    }

    switch(this.state.status){
      case 'LOADED':
        boardList = this.state.boards.map((board) =>
          <MenuItem
          key={board.name}
          value={board.name}
          primaryText={board.name}/>
        )
        break;
      default:
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
        disabled={disabledBool}
        onClick={this.handleSubmit}
      />,
    ];

    let dropDownMenu = (
      <div>
      </div>
    )
    if(this.props.thread === "true"){
      dropDownMenu = (
        <div>
          <div>
            <p> Select board </p>

          </div>
          <DropDownMenu
          value={this.state.board}
          onChange={this.handleBoardChange}
          >
            {boardList}
          </DropDownMenu><br />
        </div>
      )
    }

    return (
      <div>
        <RaisedButton label={this.props.buttonText} onClick={this.handleOpen} />
        <Dialog
          autoScrollBodyContent={true}
          title={this.props.headText}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div className="container" id="modalContainer">
            <div id="imageDropZone">
              <Dropzone onImageChange={(img)=>this.setState({image:img})}/>
            </div>
            <div className="container" id="headTextContainer">
              <TextField onChange={this.handleUserNameChange}
                hintText="Username (optional)"
                floatingLabelText="Username"
                maxLength="25"
              />
              <TextField onChange={this.handleTitleChange}
                hintText={this.props.titleHintText}
                floatingLabelText={this.props.titleLabelText}
                maxLength="50"
              />
              <Recaptcha
                sitekey="6LfwDFgUAAAAABjU3x0Mj4GBo-QIGpHN0E1VJf9D"
                render="explicit"
                verifyCallback={this.verifyCallback}
                theme="dark"
                />
            </div>
            <div>
              {dropDownMenu}
            </div>
          </div>
          <div id="textBox">
            <TextField onChange={this.handleTextChange}
              hintText="Thread starter here..."
              defaultValue={this.state.text}
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
          {this.state.threadID !== 0 &&
            <div>
              <span> Thread Created sucessfully </span>
              {/*Todo: fix for other boards to */}
              <Link to={`/${this.props.chosenBoardAbbr}/${this.state.threadID}`}>
                <RaisedButton label="Go to thread" primary={true} />
              </Link>
            </div>
          }
        </Dialog>
      </div>
    );
  }
}
