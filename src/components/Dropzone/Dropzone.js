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
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
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
    let drop = document.getElementById("fileSelect")
    drop.style.backgroundColor = 'rgb(140, 92, 228)';
    e.stopPropagation();
    e.preventDefault();
  }

  dragexit(e){
    let drop = document.getElementById("fileSelect")
    drop.style.backgroundColor = 'inherit';
  }

  dragover(e) {
    e.stopPropagation();
    e.preventDefault();
  }


  drop(e) {
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
                 onDrop={(e) => this.drop(e)} onClick={this.handleClick}
                 onDragExit={(e) => this.dragexit(e)} id="fileSelect">
                    <img id="uploadImage" className="obj" alt="Upload here" src={this.state.image}/>
                 </div>
        </div>
    );
  }
}
