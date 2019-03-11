import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      results: [],
      errors: []
    }
    // Constants
    this.HOSTNAME = 'http://api.giphy.com';
    this.PATHNAME = '/v1/gifs/search';
    this.API_KEY  = 'xxxxxxxxxxxxxxxx'; // ADD REAL API KEY
    this.SEARCH_URL = `${this.HOSTNAME}${this.PATHNAME}?api_key=${this.API_KEY}&q=`;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Giphy results for: {this.state.query}</h3>
          <div>
            {
              (this.state.errors === undefined || this.state.errors.length > 0) ?
                <div><h4>Search Error:</h4> <ul>{this.state.errors.map((error) => {return <li>{error.toString()}</li> })}</ul></div> :
                ''
            }
          <p>
            <input type='text' onChange={this.onQueryChange} onKeyPress={this.onQueryEnter} />
            <input type='submit' value='search' onClick={this.onQuerySubmit} />
          </p>
            {
              this.state.results.map((image, index) => {
                return <img src={image.images.fixed_height.url} height='200' alt={image.title} key={index} />
              })
            }
          </div>
        </header>
      </div>
    );
  }

  onQueryChange = (event) => {
    console.log(event.target.value);
    this.setState({query: event.target.value});
    console.log(this.state.query);
  }

  onQueryEnter = (event) => {
    console.log(event.key);
    if (event.key === 'Enter') {
      this.onQuerySubmit();
    }
  }

  onQuerySubmit = () => {
    // submit stored query to Giphy API with fetch
    this.setState({error: ''});
    // fetch(`${this.SEARCH_URL}${this.state.query}`)
    fetch(this.SEARCH_URL + this.state.query)
      .then(res => res.json())
      //.then( (response) => {
      //  return response.json();
      //})
      .then( (jsonResult) => {
        this.setState({results: jsonResult.data})
      })
      .catch( (error) => {
        console.log(error);
        this.setState({errors: [error]});
      });
  }
}

export default App;
