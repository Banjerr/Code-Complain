const Hapi = require('hapi');

const Path = require('path');

const Inert = require('inert');

const Nes = require('nes');

const Db = require('./db/db');

const App = new Hapi.Server();

App.connection({
  port: 9000
});

App.register([Inert, Nes, Db], err => {
  if (err) {
    throw err
  }

  App.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: Path.resolve(__dirname, "..", "build"),
        listing: false,
        index: true
      }
    }
  });

  //Return the last 5 entries stored in db
  App.route({
    method: 'GET',
    path: '/complaints',
    handler: function (request, reply) {
      App.methods.db.findEntries(5, (err, result) => {
        if (err) {
            return reply().code(500);
        }

        return reply(result);
      });
    }
  });

  // //Create a new entry
  // server.route({
  //   method: 'GET',
  //   path: '/complaints/createEntry',
  //   handler: function (request, reply) {
  //     const entry = {
  //       createdAt: new Date(),
  //       user: Faker.name.findName(),
  //       message: Faker.lorem.paragraph(),
  //       avatar: Faker.image.avatar()
  //     };
  //
  //     server.methods.db.saveEntry(entry, (err) => {
  //       if (err) {
  //         return reply().code(500);
  //       }
  //
  //       return reply().code(204);
  //     });
  //   }
  // });

  //Declare the subscription to timeline updates the client can subscribe to
  App.subscription('/complaints/updates');


  App.start(err => {
    if (err) {
      throw err
    }

    //Setup the RethinkDB change-feed and push it to the websocket connection.
    App.methods.db.setupChangefeedPush();

    console.log(`Server running at ${App.info.uri}`)
  });
});

module.exports = App;
