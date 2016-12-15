import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router';

export default class FailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      }
  }
  render() {
    return (
      <div className="CheckoutPage">
        <h2 className="Checkout-title"> Thank you for your order!</h2>
        <p className="Checkout-text">Enjoy your trip and we'll see you when you get back. There's always time for another vacation!</p>
        <br />
        <span className="Checkout-text">Click</span>
        <span className="Checkout-text">
          <Link to={'/'}  className="Checkout-reroute"> here </Link>
        </span>
        <span className="Checkout-text">to get back to shopping!</span>
      </div>
    );
  }
}
