import React, { Component } from 'react';
import api from './api';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      photos: [],
      username: null
    }
  }
  
  handleChange(e) {
    console.log("archivos seleccionado")
    console.log(e.target.files[0])

    this.setState({
      ...this.state,
      file: e.target.files[0]
    })
  }

  //esta función maneja qué pasa cuando hago submit en el formulario de subida de imágenes
  handleSubmit(e) {
    e.preventDefault()
    // Reuse of the method "addPicture" from the file '../api'
    api.addPicture(this.state.file).then(photoData => {
      let newPhotos = [...this.state.photos]
      newPhotos.push(photoData.url)

      this.setState({
        ...this.state,
        photos: newPhotos
      })
    })
  }
  render() {                
    return (
      <div className="Home">
        <h2>Photo Upload</h2>

        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input type="file" onChange={(e)=>this.handleChange(e)} /> <br/>
          <button type="submit">Upload photo</button>
        </form>

        {this.state.photos.map(photo => <img key={photo.url} src={photo.url} alt="" />)}
      </div>
    );
  }
}

export default Home;