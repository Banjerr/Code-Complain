import React, { Component } from 'react';
import classnames from 'classnames';
import nes from 'nes';
import {PaperLayout, PaperCol} from 'react-paper-css';
import ComplaintList from '../ComplainList';
import NewComplaint from '../NewComplaint';
import './style.css';

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
    .then((data) => component.resetComplaintState(data));
  }

  componentWillMount = () => {
    let component = this;

    this.client.connect((err) => err ? false : true);

    var handler = (item) => {
      component.appendComplaint(item);
    };

    this.client.subscribe('/complaints/updates', handler, (err) => err ? console.log('err is ', err) : true);
  }

  render() {
    const { className, ...props } = this.props;

    return (
      <PaperLayout className="container">
        <PaperCol colSize={'col-8'}>
        {
          this.state.loading ?
            (
              <h2>Loading complaints... wanna complain about that too? <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></h2>
            ) :
            (
              <ComplaintList complaints={this.state.complaints} />
            )
        }
        </PaperCol>
        <PaperCol colSize={'col-4'}>
          <NewComplaint />
        </PaperCol>      
      </PaperLayout>
   );
  }
}

export default App;
