import React, { Component } from 'react';
import StoreNavigation from './StoreNavigation';

export default class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      }
  }

  render() {
    return (
      <div>
        <div>
          <StoreNavigation />
          {this.props.children}
        </div>
      </div>

    );
  }
}
