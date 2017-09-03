"use strict";

const app = require("./app");
const wsListen = require("rethinkdb-websocket-server").listen;
const PORT = process.env.PORT || 9000;

wsListen({
  httpServer: app,
	httpPath: '/complaint',
	dbHost: 'localhost',
	dbPort: 28015,
	unsafelyAllowAnyQuery: true,
});

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}!`);
});
