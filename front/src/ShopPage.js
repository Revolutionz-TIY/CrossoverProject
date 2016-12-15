import React, { Component } from 'react';
import axios from 'axios';
import api from './Api.js'
import { FormattedMessage } from 'react-intl';
import StoreNavigation from './StoreNavigation';

export default class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      id: '',
      api: api(),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getItems();
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    axios.get(api() + '/products')
      .then((response) => {
        let newResults = response.data.slice(0);
        this.setState ({
          results: newResults
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onAddClick(result, e) {
    e.preventDefault();
    axios.post(api() + '/addItem?itemId=' + result.id)
    .then((response) => {
      console.log(result.id + ' added to cart.');

    }).catch((error) => {
      console.error(error);

    })
  }

  render() {
    return (
      <div>
          <StoreNavigation />
          <div className="STP-all">
          {this.state.results.map((result, index) => {
            return (
              <div key={result.id} className="STP-container">
                <img className="STP-image" src={result.image} role="presentation"></img>
                <div className="STP-header" key={result.id}>
                  <span className="STP-name">{result.name}</span><span className="STP-price">
                    <FormattedMessage
                    id={"+result.id+"}
                    defaultMessage={`\${price, number}`}
                    values={{price: result.price}}
                    />
                  </span>
                </div>
                <div className="STP-list">
                  <p className="STP-description">{result.description}</p>
                  <button className="STPbuttons" name='itemId' onClick={this.onAddClick.bind(this, result)} >Add to cart</button>
                </div>
                <div className="STP-footer">
                </div>
              </div>
            )
          })}
        </div>
      </div>

    );
  }
}
