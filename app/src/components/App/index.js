import React, { Component } from 'react';
import classnames from 'classnames';
import nes from 'nes/client';
import './style.css';

let complaints = [];

//Setup the websocket connection and react to updates
var client = new nes.Client('ws://172.18.0.1:9000');

const addComplaint = (data) => {
  console.log('adding ', data);
  fetch('/timeline/createEntry', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  }).then(function(response) {
    // response.status     //=> number 100–599
    // response.statusText //=> String
    // response.headers    //=> Headers
    // response.url        //=> String

    return response.text()
  }, function(error) {
    console.log('error is ', error.message); //=> String
  });
}

class App extends Component {
  constructor(props) {
    super(props);

    this.getComplaints = this.componentDidMount.bind(this);
    this.resetComplaintState = this.resetComplaintState.bind(this);

    this.state = {
      complaints: [],
      loading: true
    };
  }

  appendComplaint = (complaint) => {
     // set the state
     this.setState( {complaints: this.state.complaints.push(complaint), loading: false } );
  }

  resetComplaintState = (complaints) => {
    this.setState({complaints: complaints, loading: false});
  }

  componentDidMount = () => {
    var component = this;

    fetch('/complaints')
    .then((resp) => resp.json())
    .then(function(data) {
      return component.resetComplaintState(data);
    });
  }

  render() {
    const { className, ...props } = this.props;

    return (
      <div className="container">
      <button onClick={this.getComplaints}>Click</button>
      {
        this.state.loading ?
          (
            <p>loading</p>
          ) :
          (
            <ComplaintList complaints={this.state.complaints} />
          )
      }
      </div>
   );
  }
}

class ComplaintList extends Component {
  render() {
    return (
      <div className="container">
        <ul className="list-group text-center">
          {
            this.props.complaints.map((complaint, index) => (
              <p key={index}>{complaint.snippet} from {complaint.title}</p>
            ))
          }
        </ul>
       </div>
     );
   }
}

client.connect(function (err) {
 var handler = function (item) {
   console.log('item is ', item);
   return App.appendComplaint(item);
 };

 client.subscribe('/complaints/updates', handler, function (err) {});
});

export default App;
