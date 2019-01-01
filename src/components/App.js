import React, {Component} from 'react';
import Header from './Header';
import PhotoContainer from './PhotoContainer';
import axios from 'axios';
import {
    BrowserRouter, 
    Route,
} from 'react-router-dom';
import Nav from './Nav';





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

  componentDidMount() {
      axios.all([
          axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ddafc92782f2f69806e6128ba4746325&tags=dogs&per_page=24&format=json&nojsoncallback=1'),
          axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ddafc92782f2f69806e6128ba4746325&tags=cats&per_page=24&format=json&nojsoncallback=1'),
          axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ddafc92782f2f69806e6128ba4746325&tags=computers&per_page=24&format=json&nojsoncallback=1')
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

    performSearch = (query) =>{
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ddafc92782f2f69806e6128ba4746325&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
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
            <Route path="/" render={() => <Header search={this.performSearch} /> } />
            
            <Route path="/" component={Nav} />


            <Route path="/:name" render={ () => <PhotoContainer data={this.state.pics} /> } />
            <Route exact path="/dogs" render={ () => <PhotoContainer data={this.state.initialDogs} /> } />
            <Route exact path="/cats" render={ () => <PhotoContainer data={this.state.initialCats} /> } />
            <Route exact path="/computers" render={ () => <PhotoContainer data={this.state.initialComputer} /> } />
          
          </div>
          </BrowserRouter>
      )
  }
}

export default App;