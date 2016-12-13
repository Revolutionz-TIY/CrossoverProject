import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor (props) {
    super (props)
    this.state = {
      results: []
    }
  }
  componentDidMount () {
    this.getApi();
  }
  getApi () {
    axios.get('http://localhost:3000/api/hello')
    .then((response) => {
      console.log(response);
      let results = response.slice(0);
      console.log(results);
      this.setState ({
        results: results,
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
        </p>

      </div>
    );
  }
}

export default App;
