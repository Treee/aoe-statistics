module.exports = (mongoose, user, password) => {
    function _connectToDB(table) {
        // mongoose/mongo handles the db connection so open it once when the app starts and reuse the db object.
        var db = undefined;
        try {
            mongoose.connect(`mongodb://aoe-statistics-db?authSource=admin`, { useNewUrlParser: true, dbName: table, user: user, pass: password });
            db = mongoose.connection;
        } catch (exception) {
            setTimeout(() => {
                mongoose.connect(`mongodb://aoe-statistics-db?authSource=admin`, { useNewUrlParser: true, dbName: table, user: user, pass: password });
                db = mongoose.connection;
            }, 10000); // wait 10s if we fail to connect the first time.
        }

        db.on('error', function () {
            console.error.bind(console, 'connection error:')
        });

        db.once('open', function () {
            console.log('connected!');
        });
    }

    const _match = new mongoose.Schema({
        tournamentName: String,
        phase: String,
        stage: String,
        group: String,
        match: Number,
        game: Number,
        civPlayer: String,
        mapPlayed: String,
        winner: Boolean,
        position: String
    });

    const _player = new mongoose.Schema({
        name: String,
        team: String,
        matches: [_match]
    });

    function getPlayers() {
        console.log('getPlayers');
        const PlayerModel = mongoose.model('Player', _player);
        return PlayerModel.find({}).then((results) => {
            return results;
        });
    }

    function _createPlayer(playerName, playerTeam) {
        console.log(`_createPlayer ${playerName} ${playerTeam}`);
        const PlayerModel = mongoose.model('Player', _player);
        return PlayerModel.create({ name: playerName, team: playerTeam }).then((newPlayer) => {
            return newPlayer;
        });
    }

    function _deletePlayer(playerId) {
        console.log(`_deletePlayer ${playerId}`);
        const PlayerModel = mongoose.model('Player', _player);
        return PlayerModel.find({ _id: ObjectId(playerId) }).then((playerToDelete) => {
            console.log(`Found player to delete ${playerToDelete}`);
            playerToDelete.remove();
        });
    }

    function errorHandler(error) {
        console.log('Error', error);
    }

    function getTournaments() {
        const MatchModel = mongoose.model('Match', _match);
        console.log('getTournaments');
        return MatchModel.aggregate([
            {
                "$group": {
                    "_id": "$tournamentName"
                }
            }
        ]).then((results) => {
            console.log('test1', results);
            return results;
        });
    }

    return {
        MatchModel: mongoose.model('Match', _match),
        PlayerModel: mongoose.model('Player', _player),
        startServer: _connectToDB,
        getAllPlayers: getPlayers,
        createPlayer: _createPlayer,
        deletePlayer: _deletePlayer,
        getAllTournaments: getTournaments
    }
}
