import React, { Component } from 'react';
import classnames from 'classnames';

import './style.css';

export default class Account extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('Account', className)} {...props}>
        <h1>
          Account Stuff
        </h1>
      </div>
    );
  }
}
