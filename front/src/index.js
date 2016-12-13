import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import App from './App';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ShopPage from './ShopPage';
import MyWatchPage from './MyWatchPage';
import FailPage from './FailPage';
import ShopTypePage from './ShopTypePage';

import './index.css';

let results = [{}]

ReactDOM.render((

  <Router history={browserHistory}>
    <Route path="/" component={App} >,
      <IndexRoute component={HomePage} />
      <Route path="about" component={AboutPage} />
      <Route path="shop" component={ShopPage} />
      <Route path="shop/:type" component={ShopTypePage} />
      <Route path="mywatch" component={MyWatchPage} />
      <Route path="*" component={FailPage} />
    </Route>

  </Router>
),
  document.getElementById('root')
);
