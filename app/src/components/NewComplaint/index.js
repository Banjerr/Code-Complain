import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import {PaperButton, PaperLayout, PaperCol, PaperForm, PaperInput} from 'react-paper-css';
import './style.css';

import 'brace/ext/language_tools';
import 'brace/mode/javascript';
import 'brace/theme/twilight';

class NewComplaint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      code_snippet: '',
      title: '',
      timestamp: '',
    };

    this.clearForm = this.clearForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addComplaint = this.addComplaint.bind(this);
  }

  addComplaint = (data) => {
    let component = this;

    fetch('/complaints/createEntry', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    }).then(function(response) {
      return component.clearForm();
    }, function(error) {
      console.log('error is ', error.message); //=> String
    });
  }

  clearForm = () => {
    this.setState({
      value: ''
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.code_snippet !== nextState.code_snippet) {
      return false
    } else {
      return true;
    }
  }

  handleChange(event) {
    const target = event.target ? event.target : '';
    const value = target.value ? target.value : event;
    const name = target.name ? target.name : 'code_snippet';

    this.setState({
      [name]: value,
      timestamp: Date.now()
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    return this.addComplaint(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={'form-group'}>
          <label className={'input-block'}>Name</label>
          <input className={'input-block'} type="text" inputSize={'input-block'} name="user" value={this.state.value} onChange={this.handleChange} />
        </div>          

        <div className={'form-group'}>
          <label className={'input-block'}>Title</label>
          <input className={'input-block'} type="text" inputSize={'input-block'} name="title" value={this.state.value} onChange={this.handleChange} />
        </div> 
        <label>
          Code Snippet:
          <AceEditor
            mode="javascript"
            theme="twilight"
            name="code_snippet"
            onChange={this.handleChange}
            editorProps={{$blockScrolling: 'Infinity'}}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
            }}
          />
        </label>
        <PaperButton buttonText={'Complain!'} type="submit" />
      </form>
    );
  }
}

export default NewComplaint;
