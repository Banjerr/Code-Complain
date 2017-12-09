import React, { Component } from 'react';
import classnames from 'classnames';
import nes from 'nes';
import NewComplaint from '../NewComplaint';
import './style.css';

let complaints = [];

const appHost = window.location.hostname;

class App extends Component {
  constructor(props) {
    super(props);

    //Setup the websocket connection and react to updates
    this.client = new nes.Client(~appHost.indexOf('localhost') ? 'ws://localhost:80' : 'ws://code-compla.in:80');

    this.getComplaints = this.componentDidMount.bind(this);
    this.resetComplaintState = this.resetComplaintState.bind(this);
    this.appendComplaint = this.appendComplaint.bind(this);

    this.state = {
      complaints: [],
      loading: true
    };
  }

  appendComplaint = (complaint) => {
     // set the state
     let complaintArray = this.state.complaints;
     complaintArray.unshift(complaint);
     this.setState( {complaints: complaintArray, loading: false } );
  }

  resetComplaintState = (complaints) => {
    this.setState({complaints: complaints, loading: false});
  }

  componentDidMount = () => {
    let component = this;

    fetch('/complaints')
    .then((resp) => resp.json())
    .then(function(data) {
      return component.resetComplaintState(data);
    });
  }

  componentWillMount = () => {
    let component = this;

    this.client.connect(function (err) {
      if (err) {
        console.log(err);
        return false;
      }
    });

    var handler = (item) => {
      return component.appendComplaint(item);
    };

    this.client.subscribe('/complaints/updates', handler, function (err) {
      if (err) {
        return console.log('err is ', err);
      }
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
      <NewComplaint />
      </div>
   );
  }
}

class ComplaintList extends Component {
  constructor(props, context) {
    super(props, context);

    this.createComplaint = this.createComplaint.bind(this);
  }

  createComplaint = (complaint) => (
    <li key={complaint.timestamp}>
      <header>
        {complaint.title} from {complaint.user}
      </header>
      <pre>{complaint.code_snippet}</pre>
    </li>
  )

  render() {
    let complaintEntries = this.props.complaints;
    let complaintItems = complaintEntries.map(this.createComplaint);

    return (
      <div className="container">
        <ul className="list-group text-center">
          {complaintItems}
        </ul>
       </div>
     );
   }
}

export default App;
