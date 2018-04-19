
import React from 'react';
import Dialog from 'material-ui/Dialog';
import logo from '../../images/logo.png';


/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class Dropzone extends React.Component {
  state = {
      hasFile: false,
      image: "Uppload image",
  };

  handleFiles (files) {
    console.log(files)
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
        console.log(file.type)
      if (!file.type.startsWith('image/')){ continue }
      
      var reader = new FileReader();
      reader.onload = (function(parent) { return function(e) { 
          console.log(e.target.result)
          parent.setState({image:e.target.result}) }; }
        )(this);
        reader.readAsDataURL(file);
    }
  }

  handleClick(){
    document.getElementById("fileElem").click()
  }
  
  dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
  }
  
  dragover(e) {
    e.stopPropagation();
    e.preventDefault();
  }
  
  drop(e) {
    console.log("droped!!")
    e.stopPropagation();
    e.preventDefault();
  
    var dt = e.dataTransfer;
    var files = dt.files;
  
    this.handleFiles(files);
  }

  render() {
    return (
        <div>
            <input type="file" id="fileElem" accept="image/*" onChange={(e) => this.handleFiles(e.target.files)}/>
            <div onDragOver={(e) => this.dragover(e)} onDragEnter={(e) => this.dragenter(e)} 
                 onDrop={(e) => this.drop(e)} onClick={this.handleClick} id="fileSelect">Upload image :)
                    <img className="obj" src={this.state.image}/>
                 </div>
        </div>
    );
  }
}
