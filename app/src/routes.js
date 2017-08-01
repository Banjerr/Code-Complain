import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import App from './components/App';
import Account from './components/Account';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/account">Account</Link></li>
      </ul>

      <hr/>

      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/account" component={Account}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  </Router>
);

export default Routes;
