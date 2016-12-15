import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
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
      total: 0
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
            this.setState ({
              results: ciwq
            })
            console.log(ciwq);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onRemoveClick(result, e) {
    e.preventDefault();
    axios.post(api() + '/removeItem?itemId=' + result.id)
    .then((response) => {
      this.getCart();
    }).catch((error) => {
      console.error(error);
    })
  }

  onAdd1Click(result, e) {
    e.preventDefault();
    axios.post(api() + '/changeQuant?itemId=' + result.id + '&itemAmount=' + (result.quantity + 1))
    .then((response) => {
      this.getCart();
    }).catch((error) => {
      console.error(error);
    })
  }

  onRemove1Click(result, e) {
    e.preventDefault();
    axios.post(api() + '/changeQuant?itemId=' + result.id + '&itemAmount=' + (result.quantity - 1))
    .then((response) => {
      this.getCart();
    }).catch((error) => {
      console.error(error);
    })
  }

  onFormSubmit(e) {
    e.preventDefault();
  }

  render() {
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
          <form className="cartTotal-form" onSubmit={this.onFormSubmit.bind(this)}>
            <span>Enter your Zipcode: </span>
            <input type='text' className="cartTotal-zipcode" placeholder='Enter your Zipcode'></input>
          </form>
          <div className="cartTotal-subtotal">
            Total: ${this.state.total}
          </div>
        </div>

      </div>

    );
  }
}
