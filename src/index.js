const mongoose = require("mongoose");
const database = require("./db/db-connector")(mongoose, process.env.DB_USERNAME, process.env.DB_PASSWORD);
database.startServer("development", !process.env.SERVER_PORT);


const api = require("./api/api");
api.startServer(process.env.SERVER_PORT || "3000", database);