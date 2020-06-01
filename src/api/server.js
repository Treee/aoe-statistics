const express = require('express');
const app = express();
const port = 3000;
const dbconnection = require("../db/db-connector");
const mongoose = require('mongoose');

dbconnection.startServer(mongoose);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));