const SECRETS = require("../secrets");
const mongoose = require("mongoose");
const database = require("./db/db-connector")(mongoose, SECRETS.devUserName, SECRETS.devUserPassword);
database.startServer("development");


const api = require("./api/api");
api.startServer(3000, database);