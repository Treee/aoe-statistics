function _startServer(port, dbConnection) {
    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // app.options('*', cors());

    app.use(function (req, res, next) {
        var allowedOrigins = ['http://localhost:8080', 'https://itsatreee.com'];
        var origin = req.headers.origin;
        console.log(`incomming request from ${origin}`);
        if (allowedOrigins.indexOf(origin) > -1) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', true);
        return next();
    });

    app.get('/', (req, res) => res.send('Hello World!'), errorHandler);

    app.get('/api/players', (req, res) => {
        // console.log('router /api/players');
        dbConnection.getAllPlayers().then((players) => {
            console.log('players', players);
            res.status(200).json(players);
        });
    }, errorHandler);

    app.post('/api/player', (req, res) => {
        console.log('post /api/player', req.body);
        dbConnection.createPlayer(req.body.name, req.body.team).then((newPlayer) => {
            console.log('newPlayer', newPlayer);
            res.status(200).send(newPlayer);
        });
    }, errorHandler);

    app.delete('/api/player/:playerId', (req, res) => {
        console.log('delete /api/player', req.params.playerId);
        dbConnection.deletePlayer(req.params.playerId).then(() => {
            console.log('deletePlayer');
            res.status(200).send();
        });
    }, errorHandler);

    app.get('/api/tournaments', (req, res) => {
        // console.log('router /api/tournaments');
        dbConnection.getAllTournaments().then((tournaments) => {
            // console.log('tournaments', tournaments);
            res.status(200).json(tournaments);
        });
    }, errorHandler);

    function errorHandler(error) {
        console.log('Error', error);
    }

    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
}

module.exports = {
    startServer: _startServer
}