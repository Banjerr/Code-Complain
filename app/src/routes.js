import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import App from './components/App';
import Account from './components/Account';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  </Router>
);

export default Routes;
