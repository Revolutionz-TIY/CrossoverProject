import React, { Component } from 'react';
import axios from 'axios';
import api from './Api.js';
import './App.css';
import {Link} from 'react-router';
import StoreNavigation from './StoreNavigation';
import { FormattedMessage } from 'react-intl';
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import './toastr.min.css';
import './animate.min.css';


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

  addAlert (result) {
    console.log(result.name);
    this.refs.container.success(
      "",
      result.name + " added to cart!", {
      timeOut: 1000,
      extendedTimeOut: 1000
    });
  }

  getItems(nextProps) {
    var types = nextProps.params.type.split(','); // ['pat', 'watches']
    axios.get(api() + '/api/products')
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
    axios.post(api() + '/api/addItem?itemId=' + result.id)
    .then((response) => {
      console.log(result.id + ' added to cart.');
      this.addAlert.bind(this, result)();
      this.setState ({
        isFormShown: !this.state.isFormShown
      })
    }).catch((error) => {
      console.error(error);
    })
  }

  render() {
    return (
      <div>
        <ToastContainer ref="container"
                      toastMessageFactory={ToastMessageFactory}
                      className="toast-top-right" />
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
                  <div className="STPbuttons-container">
                    <button className="STPbuttons" name='itemId' onClick={this.onAddClick.bind(this, result)} >Add to cart</button>
                    <Link to={'/cart'} className="goto-button">Go to Cart</Link>
                  </div>
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
