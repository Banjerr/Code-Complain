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
	path: '/complaint',
	secure: secure,
	db: 'complaints',
});

class App extends Component {
  observe(props, state) {
		return {
			todos: new ReactRethinkdb.QueryRequest({
				query: r.table('code-snippet').orderBy({index: 'createdAt'}),
				changes: true,
				initial: []
			}),
		};
	}

  handleNewTodoKeyDown: function (event) {
		event.preventDefault();

		var val = this.refs.newField.value.trim();

		if (val) {
			var q = r.table('code-snippet').insert({title: val.title, snippet: val.snippet, createdAt: r.now()});
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
