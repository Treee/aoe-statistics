const mongoose = require("mongoose");
const database = require("./db/db-connector")(
  mongoose,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD
);
database.startServer("development", !process.env.SERVER_PORT);

const websocket = require("./websocket/client");
websocket.startClient(process.env.CLIENT_ID, (event) => {
  // this socket is one way so we dont need to handle messages received yet
});

const api = require("./api/api");
api.startServer(process.env.SERVER_PORT || "3000", database, websocket);
