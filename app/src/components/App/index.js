import React, { Component } from 'react';
import classnames from 'classnames';
import nes from 'nes';
import NewComplaint from '../NewComplaint';
import './style.css';

let complaints = [];

class App extends Component {
  constructor(props) {
    super(props);

    //Setup the websocket connection and react to updates
    this.client = new nes.Client('ws://localhost:80');

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
     console.log('complaint is ', complaint);
     let newComplaintList = this.state.complaints.push(complaint);
     this.setState( {complaints: newComplaintList, loading: false } );
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

     console.log('connected');
    });

    var handler = (item) => {
      console.log('item is ', item);
      return component.appendComplaint(item);
    };

    this.client.subscribe('/complaints/updates', handler, function (err) {
      if (err) {
        return console.log('err is ', err);
      }

      console.log('listening');
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

export default App;
