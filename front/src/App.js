import React, { Component } from 'react';
import axios from 'axios';
import api from './Api.js'
import { Link } from 'react-router';
import './App.css';
import './ionicons.css';


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
        let newResults = response.data.slice(0);
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
          <Link to={'/cart'} className="cartButton">
            <i className="icon ion-ios-cart-outline"></i>
            Cart
          </Link>
          <h1><Link to={'/'} className="App-header-text">Revolutionz</Link></h1>
          <div>
            <ul className="App-navigation">
              <li><Link to={'/about'} className="App-navigation-link">About</Link></li>
              <li><Link to={'/shop'} className="App-navigation-link">Shop</Link></li>
              <li><Link to={'/mywatch'} className="App-navigation-link">MyWatch</Link></li>
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
