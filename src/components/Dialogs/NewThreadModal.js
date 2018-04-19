import React from 'react';
import Dialog from 'material-ui/Dialog';
import './NewThreadModal.css'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import logo from '../../images/logo.png';
import Dropzone from '../Buttons/dropzone'

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class DialogExampleModal extends React.Component {
  state = {
    open: false,
    image: "",
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Post" onClick={this.handleOpen} />
        <Dialog
          title="New Post"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div className="container">
            <Dropzone onImageChange={(img)=>this.setState({image:img})}/>
            <div>
              <TextField
                hintText="My name (optional)"
              /><br />
              <TextField
                hintText="Topic headline"
              /><br />
              <div id="reCaptchaPlaceholder">

              </div>
            </div>
          </div>
          <div id="textBox">
            <TextField
              hintText="Topic starter here..."
              floatingLabelText="Topic headline"
              multiLine={true}
              fullWidth={true}
            /><br />
          </div>
        </Dialog>
      </div>
    );
  }
}
