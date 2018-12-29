import React, {Component} from 'react';
import Header from './Header';
import PhotoContainer from './PhotoContainer';
import apiKey from '../config';
import axios from 'axios'

 class App extends Component {

  constructor() {
      super();
      this.state = {
          pics: []
      }
  }

  componentDidMount() {
      axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=05237196ca2e7d5cc86c394bf30deef3&tags=sunsets&per_page=24&format=json&nojsoncallback=1')
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
          <div className="container">       
          <Header />
          <PhotoContainer />
          </div>
      )
  }
}

export default App;