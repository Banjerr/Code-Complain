const Hapi = require('hapi');

const Path = require('path');

const App = new Hapi.Server();

const plugins = [
  require('inert')
]

App.register(plugins, err => {
  if (err) {
    throw err
  }

  App.connection({
    port: 9000
  })

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
  })

  App.start(err => {
    if (err) {
      throw err
    }

    console.log(`Server running at ${App.info.uri}`)
  })
});

module.exports = App;
