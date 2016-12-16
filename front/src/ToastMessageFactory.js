import React, { Component } from 'react';

export default class ToastMessageFactory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      }
  }
  addAlert () {
    this.refs.container.success(
      "Welcome welcome welcome!!",
      "You are now home my friend. Welcome home my friend.", {
      timeOut: 30000,
      extendedTimeOut: 10000
    });
    window.open("http://youtu.be/3SR75k7Oggg");
  }
  render() {
    return (
      <div>
        MyComponent
      </div>
    );
  }
}
