import React, { Component } from 'react';
import {Link} from 'react-router';
import {packagephoto} from './images/family.jpg';
import {watchesphoto} from './images/menswatch.jpg';
import {patphoto} from './images/patphoto.jpg';
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
        <div className="home-welcome-wrapper">
          <h2>Welcome to Revolutionz</h2>
          <p>
            Have you ever woken up and wished you had more time to get your assignment done, had just a few more days to finish something at work, or even had a few more hours just to spend with you family? We've all had those moments that we hoped never ended. Well now you can do something about it!
          </p>
        </div>
        <div className="home-featureboxes">
          <div className="home-featureboxes-1">
            <img src={packagephoto} style={{width: 200, height: 200}} role="presentation"/>
            <div>
              <p>Our base packages of the most important things.</p>
              <Link to={'/shop'} className="STPbuttons">Shop Now</Link>
            </div>
          </div>
          <div className="home-featureboxes-2">
            <img src={watchesphoto} style={{width: 200, height: 200}} role="presentation"/>
            <div>
              <p>Watches so that you never lose track.</p>
              <Link to={'/shop'} className="STPbuttons">Shop Now</Link>
            </div>
          </div>
          <div className="home-featureboxes-3">
            <img src={patphoto} style={{width: 200, height: 200}} role="presentation"/>
            <div>
              <p>Have your own idea about where you want to go?</p>
              <Link to={'/shop'} className="STPbuttons">Shop Now</Link>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
