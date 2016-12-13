import React, { Component } from 'react';
import axios from 'axios';
import api from './Api.js'
import { Link } from 'react-router';
import './App.css';
import axios from 'axios';
import about from './About';


export default class App extends Component {
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
          <h1><Link to={'/'}>Revolutionz</Link></h1>
          <div>
            <ul className="App-navigation">
              {/* <li><Link to={'/about'}>About</Link></li> */}
              <li><Link to={'/shop'}>Shop</Link></li>
              <li><Link to={'/mywatch'}>MyWatch</Link></li>
            </ul>
          </div>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
