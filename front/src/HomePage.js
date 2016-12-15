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
          <h3 className="home-welcome-title">Time wasted is no longer time lost...</h3>
          <p className="home-welcome-text">
            Have you ever woken up and wished you had more time to get your assignment done,
            had a couple more days to finish something at work, or even had a few more hours
            just to spend with your friends and family? We've all had those moments, but nothing could be done about it...until now!
          </p>
          <p className="home-welcome-text">
            We've specially crafted and engineered all of your memories of happiness,
            those moments of regret or moments in history that have shaped the world to fit comfortably on your wrist.
          </p>
          <p className="home-time-text">
            Time.
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
