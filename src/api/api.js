function _startServer(port, dbConnection) {
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use((req, res, next) => {
        var allowedOrigins = ['http://localhost:8080', 'https://itsatreee.com', 'https://treee.github.io/'];
        var origin = req.headers.origin;
        console.log(`incomming request from ${origin}`);
        if (allowedOrigins.indexOf(origin) > -1) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', true);

        if (req.method === "OPTIONS") {
            return res.status(200).end();
        }
        return next();
    });

    const playerRouter = require('./player-routes')(express, dbConnection);
    app.use('/api/players', playerRouter);

    const tournamentRouter = require('./tournament-routes')(express, dbConnection);
    app.use('/api/tournaments', tournamentRouter);    
    
    const twitchWebHookRouter = require('./twitch-webhook-routes')(express, dbConnection);
    app.use('/api/twitchwebhook', twitchWebHookRouter);

    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
}

module.exports = {
    startServer: _startServer
}