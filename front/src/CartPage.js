import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
require('round10').polyfill();
import api from './Api.js'
import './App.css';
import './ionicons.css';


export default class CartPage extends Component {
  constructor (props) {
    super (props)
    this.state = {
      results: [],
      id: '',
      api: api(),
      subtotal: 0,
      zipcode: '',
      tax: 0,
      taxRate: 0,
      total: 0,
      isFormShown: true
    }
  }

  componentDidMount() {
    this.getCart();
  }

  getCart() {
    axios.get(api() + '/cart')
      .then((responseCart) => {
        axios.get(api() + '/products')
          .then((responseProducts) => {
            var cartItems = responseProducts.data.filter((v) => {
              return  responseCart.data[''+v.id+''] > 0;
            });
            var ciwq = cartItems.map((v) => {
              var newItem = v;
              newItem.quantity = responseCart.data[''+v.id+''];
              return newItem;
            });
            var itemsSubtotal = ciwq.map((item, index) => {
              var itemSubtotal = item.quantity * item.price
              return itemSubtotal;
            });
            var reducedSubtotal = itemsSubtotal.reduce(function(a, b) {
              return a + b;
            }, 0);
            this.setState ({
              results: ciwq,
              subtotal: reducedSubtotal
            })
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  onRemoveClick(result, e) {
    e.preventDefault();
    axios.post(api() + '/removeItem?itemId=' + result.id)
    .then((response) => {
      this.getCart();
      axios.get (api() + '/tax?zipCode=' + this.state.zipcode)
      .then((response) => {
        let newTaxRate = response.data.totalRate/100;
        let taxAmount = Math.round10(newTaxRate * this.state.subtotal, -2);
        let newTotal = taxAmount + this.state.subtotal
        this.setState({
          isFormShown: !this.state.isFormShown,
          taxRate: newTaxRate,
          tax: taxAmount,
          total: newTotal
        })
      })
      .catch((err) => {
        console.error(err);
      })
    }).catch((err) => {
      console.error(err);
    })
  }

  onAdd1Click(result, e) {
    e.preventDefault();
    axios.post(api() + '/changeQuant?itemId=' + result.id + '&itemAmount=' + (result.quantity + 1))
    .then((response) => {
      this.getCart();
      axios.get (api() + '/tax?zipCode=' + this.state.zipcode)
      .then((response) => {
        let newTaxRate = response.data.totalRate/100;
        let taxAmount = Math.round10(newTaxRate * this.state.subtotal, -2);
        let newTotal = taxAmount + this.state.subtotal
        this.setState({
          isFormShown: !this.state.isFormShown,
          taxRate: newTaxRate,
          tax: taxAmount,
          total: newTotal
        })
      })
      .catch((err) => {
        console.error(err);
      })
    }).catch((err) => {
      console.error(err);
    })
  }

  onRemove1Click(result, e) {
    e.preventDefault();
    axios.post(api() + '/changeQuant?itemId=' + result.id + '&itemAmount=' + (result.quantity - 1))
    .then((response) => {
      this.getCart();
      axios.get (api() + '/tax?zipCode=' + this.state.zipcode)
      .then((response) => {
        let newTaxRate = response.data.totalRate/100;
        let taxAmount = Math.round10(newTaxRate * this.state.subtotal, -2);
        let newTotal = taxAmount + this.state.subtotal
        this.setState({
          isFormShown: !this.state.isFormShown,
          taxRate: newTaxRate,
          tax: taxAmount,
          total: newTotal
        })
      })
      .catch((err) => {
        console.error(err);
      })
    }).catch((err) => {
      console.error(err);
    })
  }

  onNewValue(e) {
   this.setState({
     zipcode: e.target.value
   });
  }

  getTax(e) {
    e.preventDefault();
    axios.get (api() + '/tax?zipCode=' + this.state.zipcode)
    .then((response) => {
      let newTaxRate = response.data.totalRate/100;
      let taxAmount = Math.round10(newTaxRate * this.state.subtotal, -2);
      let newTotal = taxAmount + this.state.subtotal
      this.setState({
        isFormShown: !this.state.isFormShown,
        taxRate: newTaxRate,
        tax: taxAmount,
        total: newTotal
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  onShowTaxes(e) {
    e.preventDefault();
    this.setState({
      isFormShown: !this.state.isFormShown
    })
  }

  render() {
    let taxForm =
      <form className="cartTotal-form" onSubmit={this.getTax.bind(this)}>
        <span>Enter your Zipcode: </span>
        <input type='text' maxLength='5' className="cartTotal-zipcode" placeholder='Enter your Zipcode'  onChange={this.onNewValue.bind(this)} value={this.state.newZipValue}></input>
      </form>
    let taxInfo =
      <div className="cartTotal-tax">
        <span>Taxes: ${this.state.tax}</span>
      </div>

    return (
      <div className="cartPage">
        <Link to={'/shop'} className="cartReturn-button">Continue Shopping</Link>
        {this.state.results && this.state.results.length < 1 ? <p>Hey your cart is empty. Continue shopping, we'll be here when you're ready!</p> : null}
        {this.state.results.map((result, index) => {
          return (
            <div key={result.id} className="cartItem-container">
              <div className="cartItem-info">
                <h3>{result.name}</h3>
                <h4><span className="cartItem-price">
                  <FormattedMessage
                  id={"+result.id+"}
                  defaultMessage={`\${price, number}`}
                  values={{price: result.price}}
                  />
                </span>
                </h4>
              </div>
              <div className="cartItem-quantity-wrapper">
                <span>Quantity: {result.quantity}</span>
                <br></br>
                <button className="cartItem-controller" name='itemId' onClick={this.onAdd1Click.bind(this, result)}>
                  <i className="icon ion-plus-round"></i>
                </button>
                <button className="cartItem-controller" name='itemId' onClick={this.onRemove1Click.bind(this, result)}>
                  <i className="icon ion-minus-round"></i>
                </button>
                <br></br>
                <button className="cartItem-button" name='itemId' onClick={this.onRemoveClick.bind(this, result)}>Remove <i className="icon ion-trash-b"></i></button>
              </div>
            </div>
          )
        })}

        <div className="cartTotal-container">
          <div className="cartTotal-subtotal">
            Subtotal: ${this.state.subtotal}
          </div>
          {taxForm}<span><button className="searchInput button" onClick={this.onShowTaxes.bind(this)}>Get Taxes</button></span>
          {taxInfo}
          <div className="cartTotal-subtotal">
            Total: ${this.state.total}
          </div>
        </div>
        <div className="checkout-container">
          <Link to={'/checkout'} className="checkout-button">Checkout</Link>
        </div>
      </div>

    );
  }
}
