import React, { Component } from 'react';
import axios from 'axios';
import api from './Api.js'
import './App.css';


export default class ShopTypePage extends Component {
  constructor (props) {
    super (props)
    this.state = {
      results: [],
      id: '',
      api: api()
    }
  }

  componentDidMount() {
    console.log(this.props.params.type);
    this.getItems();
  }

  getItems() {
    axios.get(api() + '/products')
      .then((response) => {
        console.log(response);
        let newResults = response.data.slice(0).filter((v) => {
          return v.type.toLowerCase().trim() === this.props.params.type
        } );
        this.setState ({
          results: newResults
        })
        console.log(newResults);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onAddClick(result, e) {
    e.preventDefault();
    console.log(result.id);
    axios.post(api() + '/addItem?itemId=' + result.id)
    .then((response) => {
      console.log(response);

    }).catch((error) => {
      console.error(error);
    })

  }

  render() {
    return (
      <div>
        {this.state.results.map((result, index) => {
          console.log(result);
          return (
            <div className="STP-container">
              <div className="STP-content" key={result.id}>
                <img className="STP-image" src={result.image} role="presentation"></img>
                <div className="STP-header">
                  <span className="STP-name">{result.name}</span><span className="STP-price">${result.price}</span>
                </div>
                <div className="STP-list">
                  <p className="STP-description">{result.description}</p>
                  <button className="STPbuttons" name='itemId' onClick={this.onAddClick.bind(this, result)} >Add to cart</button>
                </div>
                <div className="STP-footer">

                </div>

              </div>
            </div>
          )
        })}
      </div>
    );
  }
}
