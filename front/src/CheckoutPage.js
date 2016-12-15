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
        <div className="checkout-text">
          <h2> Thank you for your order!</h2>
            Enjoy your trip and we'll see you when you get back. There's always more time for another vacation!
            <span className="checkout-text">
              <Link to={'/'}  className="checkout-reroute">Homepage</Link>
            </span>
        </div>

    </div>
    );
  }
}
