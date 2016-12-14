import React, { Component } from 'react';
import { Link } from 'react-router';


export default class StoreNavigation extends Component {
  render() {
    return(
      <ul className="Shop-navigation">
        <li><Link to={'/shop/packages'}>Time Packages</Link></li>
        <li><Link to={'/shop/watches'}>Watches</Link></li>
        <li><Link to={'/shop/pat'}>Pick-A-Time Packages</Link></li>
      </ul>
    )
  }

}
