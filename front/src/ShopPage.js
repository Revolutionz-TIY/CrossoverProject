import React, { Component } from 'react';
import axios from 'axios';
import api from './Api.js'
import { FormattedMessage } from 'react-intl';
import StoreNavigation from './StoreNavigation';
import {Link} from 'react-router';
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import './toastr.min.css';
import './animate.min.css';


export default class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      id: '',
      api: api(),
      isCartButonShown: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getItems();
  }

  componentDidMount() {
    this.getItems();
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

  getItems() {
    axios.get(api() + '/api/products')
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
                  <button className="STPbuttons" name='itemId' onClick={this.onAddClick.bind(this, result)} >Add to cart</button>
                  <button className="goto-button">
                    <Link to={'/cart'} className="goto-button">Go to Cart</Link>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    );
  }
}
