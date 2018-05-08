
import React from 'react';
import './dropzone.css';
import UploadImage from '../../images/uploadImage.png'


/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class Dropzone extends React.Component {
  state = {
      hasFile: false,
      image: UploadImage,
  };

  handleFiles (files) {
    console.log(files)
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
        console.log(file.type)
      if (!file.type.startsWith('image/')){ continue }

      var reader = new FileReader();
      reader.onload = (function(parent, file) { return function(e) {
          parent.setState({image:e.target.result})
          parent.props.onImageChange(file)
        };
       })(this, file);
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
                 onDrop={(e) => this.drop(e)} onClick={this.handleClick} id="fileSelect">
                    <img id="uploadImage" className="obj" alt="Upload here" src={this.state.image}/>
                 </div>
        </div>
    );
  }
}
