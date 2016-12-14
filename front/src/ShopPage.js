import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      }
  }

  render() {
    return (
      <div>
        ShopPage
        <ul className="Shop-navigation">
          <li><Link to={'/shop/package'}>Time Packages</Link></li>
          <li><Link to={'/shop/watches'}>Watches</Link></li>
          <li><Link to={'/shop/pat'}>Pick-A-Time Packages</Link></li>
        </ul>
        <div>
          {this.props.children}
        </div>
      </div>

    );
  }
}
