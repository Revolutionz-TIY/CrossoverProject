import React, { Component } from 'react';
import axios from 'axios';
import api from './Api.js'
import './App.css';
import StoreNavigation from './StoreNavigation';
import { FormattedMessage } from 'react-intl';


export default class ShopTypePage extends Component {
  constructor (props) {
    super (props)
    this.state = {
      results: [],
      id: '',
      api: api(),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getItems(nextProps);
  }

  componentDidMount() {
    this.getItems(this.props);

  }
  getItems(nextProps) {
    var types = nextProps.params.type.split(','); // ['pat', 'watches']
    axios.get(api() + '/products')
      .then((response) => {
        let newResults = response.data.slice(0).filter((v) => {
          var currentProductsValue = v.type.toLowerCase().trim();
          // var nextParamsType = nextProps.params.type.split(',');
          // 'package'
          // 'pat'
          // 'watches'
            // console.log(nextParamsType);
            // console.log(types, currentProductsValue);
            // console.log(types.indexOf(currentProductsValue) > -1);
          if(types.indexOf(currentProductsValue) > -1) { // in array
            return true
          } else {
            return false
          }
        });
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
                <div className="STP-footer"></div>
              </div>
          )
        })}
      </div>
    </div>
    );
  }
}
