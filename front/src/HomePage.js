import React, { Component } from 'react';
import {Link} from 'react-router';
// import {packagephoto} from './images/family.jpg';
// import {watchesphoto} from './images/menswatch.jpg';
// import {patphoto} from './images/patphoto.jpg';
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
              <img src='http://i.imgur.com/dkDadf7.jpg' className="home-featureboxes-img1" alt="Packages"/>
            <div className="home-featureboxes-textbutton">
              <p className="home-featureboxes-text">Our base packages of the most important things.</p>
              <Link to={'/shop'}  className="home-featureboxes-button">Shop Now</Link>
            </div>
          </div>
          <div className="home-featureboxes-2">
            <img src='http://i.imgur.com/Vqcv9Cv.jpg' className="home-featureboxes-img2" alt="Watches"/>
            <div className="home-featureboxes-textbutton">
              <p className="home-featureboxes-text">Watches so that you never lose track.</p>
              <Link to={'/shop'} className="home-featureboxes-button">Shop Now</Link>
            </div>
          </div>
          <div className="home-featureboxes-3">
            <img src='http://www.usnews.com/cmsmedia/65/e7/1a2e03544c1b9252474423d335ab/160223-timetravel-stock.jpg' className="home-featureboxes-img3" alt="P-A-T"/>
            <div className="home-featureboxes-textbutton">
              <p className="home-featureboxes-text">Have your own idea about where you want to go?</p>
              <Link to={'/shop'} className="home-featureboxes-button">Shop Now</Link>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
