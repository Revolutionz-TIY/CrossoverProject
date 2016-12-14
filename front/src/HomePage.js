import React, { Component } from 'react';
import './App.css';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      }
  }
  render() {
    return (
      <div className="home-container">
        <h2>Welcome to Revolutionz</h2>
        <p>
          We’re doing a lot of typing in this little space here.
          I love adding random filler to the project! It never
          actually makes sense when you put it here, but
          some day it will say something worth while.
        </p>
      </div>
    );
  }
}
