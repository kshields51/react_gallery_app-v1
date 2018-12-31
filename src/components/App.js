import React, {Component} from 'react';
import Header from './Header';
import PhotoContainer from './PhotoContainer';
import apiKey from '../config';
import axios from 'axios';
import {
    BrowserRouter, 
    Route,
    withRouter
} from 'react-router-dom';




 class App extends Component {

  constructor() {
      super();
      this.state = {
          pics: []
      }
  }

  componentDidMount() {
      axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=141d2d8437fd4d51e73bb648ff31a354&tags=sunsets&per_page=24&format=json&nojsoncallback=1')
      .then(response => {
          this.setState({
              pics: response.data.photos.photo
          })

      })
      .catch(error => {
          console.log('Error fetching and parsing data', error);
      });
  }

  render() {
      return (
          <BrowserRouter>
          <div className="container">  
            <Route path="/" component={Header} />
            <Route exact path="/" render={ () => <PhotoContainer data={this.state.pics} /> } /> 
            <Route path="/:name" render={ () => <PhotoContainer data={this.state.pics} /> } />
          
          </div>
          </BrowserRouter>
      )
  }
}

export default App;