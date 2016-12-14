import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import api from './Api.js'
import './App.css';


export default class CartPage extends Component {
  constructor (props) {
    super (props)
    this.state = {
      results: [],
      id: '',
      api: api()
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

  render() {
    return (
      <div>
        <Link to={'/shop'} className="STPbuttons">Continue Shopping</Link>
        {this.state.results && this.state.results.length < 1 ? <p>Hey your cart is empty. Continue shopping, we'll be here when you're ready!</p> : null}
        {this.state.results.map((result, index) => {
          return (
            <div key={result.id} className="STP-container">
              {result.name}
              {result.quantity}
              <button className="STPbuttons" name='itemId' onClick={this.onRemoveClick.bind(this, result)} >Remove from cart</button>

            </div>
          )
        })}
      </div>

    );
  }
}
