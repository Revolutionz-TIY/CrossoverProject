import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import App from './App';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ShopPage from './ShopPage';
import MyWatchPage from './MyWatchPage';
import FailPage from './FailPage';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';
import ShopTypePage from './ShopTypePage';
import { IntlProvider } from 'react-intl';
import './toastr.min.css';
import './animate.min.css';


import './index.css';


ReactDOM.render((
<IntlProvider locale="en">
  <Router history={browserHistory}>
    <Route path="/" component={App} >,
      <IndexRoute component={HomePage} />
      <Route path="about" component={AboutPage} />
      <Route path="shop" component={ShopPage} />
      <Route path="shop/:type" component={ShopTypePage} />
      <Route path="mywatch" component={MyWatchPage} />
      <Route path="cart" component={CartPage} />
    </Route>
    <Route path="/checkout" component={CheckoutPage} />
    <Route path="*" component={FailPage} />
  </Router>
</IntlProvider>
),
  document.getElementById('root')
);
