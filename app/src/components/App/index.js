import React, { Component } from 'react';
import classnames from 'classnames';
import nes from 'nes/client';
import './style.css';

//Setup the websocket connection and react to updates
var client = new nes.Client('ws://localhost:9000');

client.connect(function (err) {
  var handler = function (item) {
    console.log('item is ', item);
  };

  client.subscribe('/complaints/updates', handler, function (err) {});
});

class App extends Component {

  render() {
    const { className, ...props } = this.props;

    return (
      <div className={classnames('App', className)} {...props}>
        <div className="App-header">

        </div>
        <p className="App-intro">

        </p>
      </div>
    );
  }
}

export default App;
