import React, { Component } from 'react';
import axios from 'axios';
import CardList from '../Card/CardList'
import "./ImageSearch.css"

class ImageSearch extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            dogs: []
          };
    }


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
      src : URL.createObjectURL(e.target.files[0])
    })
  };

  handleSubmit = (e) => {

    const HOSTNAME_TAG = "<hostname>"
    let BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
    if(BASE_API_URL.includes(HOSTNAME_TAG)){
    //window.location.hostname
    BASE_API_URL = BASE_API_URL.replace(HOSTNAME_TAG, window.location.hostname);
    }

    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('file', this.state.image);
    let url = `${BASE_API_URL}/file`;
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          this.setState({ dogs: res.data.data});
        })
        .catch(err => console.log(err))
  };

  render() {
    return (
      <div className="App">
          <h2 className="f2">Image Search</h2>
        <form onSubmit={this.handleSubmit}>
          <p>
            <input type="file"
                   id="image"
                   class="up-btn"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
          </p>
          <button type="submit" class="btn">Find Similar</button>
          {this.state.image == null ? (
              console.log("")
            ) : (
              <div className="card-div">
              <div className="card-query">
              <img src={this.state.src} alt="Avatar" width="100%"/>
              <div className="container">
                <h4><b>Query Image</b></h4> 
              </div>
            </div>
            </div>
            )}
        </form>
        
        <CardList dogs={this.state.dogs} />
      </div>
    );
  }
}

export default ImageSearch;
