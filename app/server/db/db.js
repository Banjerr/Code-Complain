'use strict';

const r = require('rethinkdb');

exports.register = function (server, options, next) {
  const db = 'complaints';
  const code_snippets = 'code_snippet';
  const users = 'users';

  let conn;

  r.connect({host: 'rethinkdb', port: 28015}, function(err, connection){
    if (err) {
      return next(err);
    }

    conn = connection;

    r.dbCreate(db).run(connection, (err, result) => {
      r.db(db).tableCreate(code_snippets).run(connection, (err, result) => {
        return next();
      });
    });
  });

  server.method('db.saveEntry', (entry, callback) => {
    console.log('entry is ', entry);
    r.db(db).table(code_snippets).insert(entry).run(conn, callback);
  });

  server.method('db.findEntries', (limit, callback) => {
    r.db(db).table(code_snippets).orderBy(r.desc('createdAt')).limit(limit).run(conn, callback);
  });

  server.method('db.setupChangefeedPush', () => {
    r.db(db).table(code_snippets).changes().run(conn, (err, cursor) => {
      cursor.each((err, item) => {
        console.log('item is ', item);
        server.publish('/complaints/updates', item.new_val);
      });
    });
  }, {
    callback: false
  });
};

exports.register.attributes = {
  name: 'db'
};
