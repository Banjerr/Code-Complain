import React, { Component } from 'react';
import './style.css';

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

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

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
          <textarea name="code_snippet" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NewComplaint;
