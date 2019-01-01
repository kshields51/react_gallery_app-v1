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

/* this is the main app which holds, in state, all the data retrieved from the api */

/* App Class which contains api data */
 class App extends Component {

  constructor() { //defines the initial state of App
      super();
      this.state = {
          pics: [],
          initialDogs: [],
          initialCats: [],
          initialComputer: []
      }
  }
// componentDidMount stores three initial api calls that will be mapped to the nav buttons
//Code for making multiple calls at once was adapted from https://github.com/axios/axios/issues/371
  componentDidMount() { //runs the below code when the page laods
      axios.all([ //api calls using axios are stored in a list
          axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`),
          axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`),
          axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`)
        ])
      .then(axios.spread((dogResponse, catResponse, computerResponse) => { // spread allows all three responses to be passed to the state objects
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
            <Route path="/" render={() => <Header search={this.performSearch} /> } /> {/* renders the Header component and passes the prop to enable the search bar to operate */}
            <Route path="/" component={Nav} /> {/* renders the Nav component */}
            <Route exact path="/search/:name" render={ () => <PhotoContainer data={this.state.pics} /> } /> {/* renders a page that matches whatever was searched */}
            <Route exact path="/button1/:name" render={ () => <PhotoContainer data={this.state.initialDogs} /> } /> {/* renders when dogs is clicked */}
            <Route exact path="/button2/:name" render={ () => <PhotoContainer data={this.state.initialCats} /> } /> {/* renders when cats is clicked */}
            <Route exact path="/button3/:name" render={ () => <PhotoContainer data={this.state.initialComputer} /> } /> {/* renders when computers is clicked */}
          </div>
          </BrowserRouter>
      )
  }
}

export default App;