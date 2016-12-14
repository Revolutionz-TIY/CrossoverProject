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
      <div className="FailPage">
        <div className="fail-text">
          <h2> Uh oh...</h2>
            Uhh... that page never returned from it's trip.
            That won't happen to you...we promise!
          <br />
            Just come back to us at the

          <span className="fail-text">
            <Link to={'/'}  className="fail-reroute"> Homepage </Link>
          </span>
          and we'll get you going again.
        </div>
        <div className="fail-text-title">
          404!
      </div>

    </div>
    );
  }
}
