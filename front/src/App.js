import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import api from './Api.js'
import './App.css';

class App extends Component {
  constructor (props) {
    super (props)
    this.state = {
      results: [],
      api: api()
    }
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    axios.get(api() + '/products')
      .then((response) => {
        console.log(response);
        let newResults = response.data.slice(0);
        console.log(newResults);
        this.setState ({
          results: newResults,
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          {this.state.results.map((item, index) => {
            return (
              <li key={item.id}>{item.name} </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default App;
