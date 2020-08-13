function _startServer(port, dbConnection) {
    const express = require('express');
    const bodyParser = require('body-parser');

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use((req, res, next) => {
        var allowedOrigins = ['http://localhost:8080', 'https://itsatreee.com'];
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

    const apiRouter = express.Router();

    apiRouter.route('/api/playerz/:id')
        .post((req, res) => {
            console.log('delete /api/player', req.body);
            console.log('delete /api/player', req.params.playerId);
            const playerId = req.params.id || req.body.playerId;
            dbConnection.deletePlayer(playerId).then(() => {
                console.log('deletePlayer');
                res.status(200).json();
            });
        }, errorHandler);

    apiRouter.route('/api/players').get((req, res) => {
        // console.log('router /api/players');
        dbConnection.getAllPlayers().then((players) => {
            console.log('players', players);
            res.status(200).json(players);
        });
    }, errorHandler);

    apiRouter.route('/api/player')
        .post((req, res) => {
            console.log('post /api/player', req.body);
            dbConnection.createPlayer(req.body.name, req.body.team).then((newPlayer) => {
                console.log('newPlayer', newPlayer);
                res.status(200).json(newPlayer);
            });
        }, errorHandler);

    // app.get('/api/players', (req, res) => {
    //     // console.log('router /api/players');
    //     dbConnection.getAllPlayers().then((players) => {
    //         console.log('players', players);
    //         res.status(200).json(players);
    //     });
    // }, errorHandler);

    // app.post('/api/player', (req, res) => {
    //     console.log('post /api/player', req.body);
    //     dbConnection.createPlayer(req.body.name, req.body.team).then((newPlayer) => {
    //         console.log('newPlayer', newPlayer);
    //         res.status(200).json(newPlayer);
    //     });
    // }, errorHandler);

    // app.delete('/api/player', (req, res) => {
    //     console.log('delete /api/player', req.body);
    //     console.log('delete /api/player', req.params.playerId);
    //     const playerId = req.params.playerId || req.body;
    //     dbConnection.deletePlayer(playerId).then(() => {
    //         console.log('deletePlayer');
    //         res.status(200).json();
    //     });
    // }, errorHandler);

    apiRouter.route('/api/tournaments')
        .get((req, res) => {
            // console.log('router /api/tournaments');
            dbConnection.getAllTournaments().then((tournaments) => {
                // console.log('tournaments', tournaments);
                res.status(200).json(tournaments);
            });
        }, errorHandler);


    app.use('/', apiRouter);
    // app.get('/', (req, res) => res.send('Hello World!'), errorHandler);


    function errorHandler(error) {
        console.log('Error', error);
    }

    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
}

module.exports = {
    startServer: _startServer
}