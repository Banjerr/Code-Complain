import React, { Component } from 'react';
import classnames from 'classnames';
import ReactRethinkdb from 'react-rethinkdb';
import './style.css';

var r = ReactRethinkdb.r;
var RethinkSession = ReactRethinkdb.DefaultSession;

var secure = window.location.protocol === 'https:';
RethinkSession.connect({
	host: window.location.hostname,
	port: window.location.port || (secure ? 443 : 80),
	secure: secure,
	db: 'code_complain',
});

class App extends Component {
  observe(props, state) {
		return {
			todos: new ReactRethinkdb.QueryRequest({
				query: r.table('complaints').orderBy({index: 'createdAt'}),
				changes: true,
				initial: []
			}),
		};
	}

  handleNewTodoKeyDown(event) {
		event.preventDefault();

		var val = this.refs.newField.value.trim();

		if (val) {
			var q = r.table('complaints').insert({title: val.title, snippet: val.snippet, createdAt: r.now()});
			RethinkSession.runQuery(q);
			this.refs.newField.value = '';
		}
	}

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

App.mixins = [ReactRethinkdb.DefaultMixin];

export default App;
