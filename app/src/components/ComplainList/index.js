import React, { Component } from 'react';
import {PaperLayout, PaperCol} from 'react-paper-css';
import './style.css';

class ComplaintList extends Component {
  constructor(props, context) {
    super(props, context);

    this.createComplaint = this.createComplaint.bind(this);
  }

  createComplaint = (complaint) => (
    <li key={complaint.timestamp} className={'card'}>
      <header className={'card-header'}>
        <h3 className={'card-title'}><kbd>{complaint.title}</kbd></h3> 
        <h4 className={'card-subtitle'}>From: {complaint.user}</h4>
      </header>
      <div className={'card-body'}>
        <pre>{complaint.code_snippet}</pre>
      </div>      
    </li>
  )

  render() {
    let complaintEntries = this.props.complaints;
    let complaintItems = complaintEntries.map(this.createComplaint);

    return (
      <PaperLayout>
        <PaperCol colDisplay={'col-fill'}>
          <ul className="list-group">
            {complaintItems}
          </ul>
        </PaperCol>        
       </PaperLayout>
     );
   }
}

export default ComplaintList;