import React, {Component} from 'react';
import Header from './Header';
import PhotoContainer from './PhotoContainer';
import axios from 'axios';
import {
    BrowserRouter, 
    Route,
} from 'react-router-dom';
import Nav from './Nav';
import apiKey from '../config'

{/* this is the main app which holds, in state, all the data retrieved from the api */}

{/* App Class which contains api data */}
 class App extends Component {

  constructor() {
      super();
      this.state = {
          pics: [],
          initialDogs: [],
          initialCats: [],
          initialComputer: []
      }
  }
// componentDidMount stores three initial api calls that will be mapped to the nav buttons
  componentDidMount() {
      axios.all([
          axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`),
          axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`),
          axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`)
        ])
      .then(axios.spread((dogResponse, catResponse, computerResponse) => {
          this.setState({
              initialDogs: dogResponse.data.photos.photo,
              initialCats: catResponse.data.photos.photo,
              initialComputer: computerResponse.data.photos.photo
          })}))
          .catch(error => {
            console.log('Error fetching and parsing data', error);

      
    })}

//perform search uses interpolation to dynamically add whatever is typed into the search bar into the search call
    performSearch = (query) =>{
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
            .then(response => {
                this.setState({ //sets the state of pics to the custom search
                    pics: response.data.photos.photo
          })

      })
      .catch(error => {
          console.log('Error fetching and parsing data', error);
      });
    }
//renders paths to the page
  render() {
      return (
          <BrowserRouter>
          <div className="container">  
            <Route path="/" render={() => <Header search={this.performSearch} /> } />
            <Route path="/" component={Nav} />
            <Route exact path="/search/:name" render={ () => <PhotoContainer data={this.state.pics} /> } />
            <Route exact path="/button1/:name" render={ () => <PhotoContainer data={this.state.initialDogs} /> } />
            <Route exact path="/button2/:name" render={ () => <PhotoContainer data={this.state.initialCats} /> } />
            <Route exact path="/button3/:name" render={ () => <PhotoContainer data={this.state.initialComputer} /> } />
          
          </div>
          </BrowserRouter>
      )
  }
}

export default App;