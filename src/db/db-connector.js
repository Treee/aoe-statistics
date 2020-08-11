module.exports = (mongoose, user, password) => {
    function _connectToDB(table) {
        mongoose.connect(`mongodb://aoe-statistics-api?authSource=admin`, { useNewUrlParser: true, dbName: table, user: user, pass: password });
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
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
        // console.log(`_createPlayer ${playerName} ${playerTeam}`);
        const PlayerModel = mongoose.model('Player', _player);
        return PlayerModel.create({ name: playerName, team: playerTeam }).then((newPlayer) => {
            return newPlayer;
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
        getAllTournaments: getTournaments
    }
}
