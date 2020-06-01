function _startServer(port, dbConnection) {
    const express = require('express');
    const app = express();

    app.get('/', (req, res) => res.send('Hello World!'));
    app.get('/api/players', (req, res) => {
        console.log('router /api/players');
        const allPlayers = dbConnection.getAllPlayers().then((players) => {
            console.log('players', players);
            res.status(200).json(allPlayers);
        });
    });

    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
}

module.exports = {
    startServer: _startServer
}