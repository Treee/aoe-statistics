function _startServer(port, dbConnection) {
    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');

    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));

    app.options('*', cors());

    app.get('/', (req, res) => res.send('Hello World!'));
    app.get('/api/players', (req, res) => {
        // console.log('router /api/players');
        dbConnection.getAllPlayers().then((players) => {
            // console.log('players', players);
            res.status(200).json(players);
        });
    });

    app.post('/api/player', (req, res) => {
        console.log('post /api/player', req.body);
        dbConnection.createPlayer(req.body.name, req.body.team).then((newPlayer) => {
            console.log('newPlayer', newPlayer);
            res.status(200).send(newPlayer);
        });
    });

    app.get('/api/tournaments', (req, res) => {
        // console.log('router /api/tournaments');
        dbConnection.getAllTournaments().then((tournaments) => {
            // console.log('tournaments', tournaments);
            res.status(200).json(tournaments);
        });
    });

    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
}

module.exports = {
    startServer: _startServer
}