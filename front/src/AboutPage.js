import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router';


export default class About extends Component {
  render() {
    return(
      <div>
        <ul>
          <Link to={'/about/'}><span className="AboutPage">Stuff</span></Link>
        </ul>
      </div>
    )
  }
}
