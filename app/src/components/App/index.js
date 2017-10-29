import React, { Component } from 'react';
import classnames from 'classnames';
import nes from 'nes/client';
import './style.css';

//Setup the websocket connection and react to updates
var client = new nes.Client('ws://172.18.0.1:9000');

client.connect(function (err) {
  var handler = function (item) {
    console.log('item is ', item);
  };

  client.subscribe('/complaints/updates', handler, function (err) {});
});

const getComplaints = function() {
  fetch('complaints').then(function(response) {
    console.log('response is ',response);
  }, function(error) {
    console.log('error is ',error);
  });
}
getComplaints();
const addComplaint = function(data) {
  console.log('adding ', data);
  fetch('/timeline/createEntry', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  }).then(function(response) {
    response.status     //=> number 100–599
    response.statusText //=> String
    response.headers    //=> Headers
    response.url        //=> String

    return response.text()
  }, function(error) {
    error.message //=> String
  });
}

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
