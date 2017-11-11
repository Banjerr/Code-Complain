import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import './style.css';

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
        <label>
          Name:
          <input type="text" name="user" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Title:
          <input type="text" name="title" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Code Snippet:
          <AceEditor
            mode="javascript"
            theme="twilight"
            name="code_snippet"
            onChange={this.handleChange}
            editorProps={{$blockScrolling: true}}
            setOptions={{
              enableEmmet: true,
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              useElasticTabstops: true
            }}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NewComplaint;
