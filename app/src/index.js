import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory } from 'history/createBrowserHistory';

import Routes from './routes';

import './index.css';

ReactDOM.render(
  <Routes history={createHistory} />,
  document.getElementById('root')
);
