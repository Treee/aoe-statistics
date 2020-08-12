const mongoose = require("mongoose");
const database = require("./db/db-connector")(mongoose, process.env.DB_USERNAME, process.env.DB_PASSWORD);
database.startServer("development");


const api = require("./api/api");
// api.startServer(process.env.SERVER_PORT, database);
api.startServer(3000, database);