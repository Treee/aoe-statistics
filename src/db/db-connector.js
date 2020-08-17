module.exports = (mongoose, user, password) => {
    function _connectToDB(table, isLocalDev) {
        // mongoose/mongo handles the db connection so open it once when the app starts and reuse the db object.
        var db = undefined;
        const mongooseConnectionOptions = { useNewUrlParser: true, dbName: table, user: user, pass: password, useFindAndModify: false };
        try {
            if (isLocalDev) {
                mongoose.connect(`mongodb://localhost`, mongooseConnectionOptions);
            } else {
                mongoose.connect(`mongodb://aoe-statistics-db?authSource=admin`, mongooseConnectionOptions);
            }
            db = mongoose.connection;
        } catch (exception) {
            setTimeout(() => {
                mongoose.connect(`mongodb://aoe-statistics-db?authSource=admin`, mongooseConnectionOptions);
                db = mongoose.connection;
            }, 10000); // wait 10s if we fail to connect the first time.
        }

        db.on('error', function () {
            console.error('connection error:')
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
        civPlayed: String,
        mapPlayed: String,
        winner: String,
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
        }, errorHandler);
    }

    function _getPlayerById(playerId) {
        console.log('_getPlayerById', playerId);
        const PlayerModel = mongoose.model('Player', _player);
        return PlayerModel.findById(playerId, (foundPlayer) => {
            console.log(`foundPlayer ${foundPlayer}`);
            return foundPlayer;
        }, errorHandler);
    }

    function _createPlayer(playerName, playerTeam) {
        console.log(`_createPlayer ${playerName} ${playerTeam}`);
        const PlayerModel = mongoose.model('Player', _player);
        return PlayerModel.create({ name: playerName, team: playerTeam }).then((newPlayer) => {
            return newPlayer;
        }, errorHandler);
    }

    function _deletePlayer(playerId) {
        console.log(`_deletePlayer ${playerId}`);
        const PlayerModel = mongoose.model('Player', _player);
        return PlayerModel.findByIdAndRemove(playerId, () => {
            console.log(`player deleted ${playerId}`);
            // playerToDelete.remove();
        }, errorHandler);
    }

    function errorHandler(error) {
        console.log('Error', error);
    }

    function _getTournaments() {
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

    function _getMatchById(matchId) {
        const MatchModel = mongoose.model('Match', _match);
        return MatchModel.findById(matchId, (foundMatch) => {
            console.log(`foundMatch ${foundMatch}`);
            return foundMatch;
        }, errorHandler);
    }

    function _createMatch(tournamentName, phase, stage, group, match, game, civPlayed, mapPlayed, winner, position) {
        console.log(`_createPlayer ${tournamentName}, ${phase}, ${stage}, ${group}, ${match}, ${game}, ${civPlayed}, ${mapPlayed}, ${winner}, ${position}`);
        const MatchModel = mongoose.model('Match', _match);
        return MatchModel.create({
            tournamentName: tournamentName,
            phase: phase,
            stage: stage,
            group: group,
            match: match,
            game: game,
            civPlayed: civPlayed,
            mapPlayed: mapPlayed,
            winner: winner,
            position: position
        }).then((newMatch) => {
            return newMatch;
        }, errorHandler);
    }

    function _deleteMatch(id) {
        console.log(`_deletePlayer ${playerId}`);
        const MatchModel = mongoose.model('Match', _match);
        return MatchModel.findByIdAndRemove(id, () => {
            console.log(`match deleted ${id}`);
            // playerToDelete.remove();
        }, errorHandler);
    }

    return {
        MatchModel: mongoose.model('Match', _match),
        PlayerModel: mongoose.model('Player', _player),
        startServer: _connectToDB,
        getAllPlayers: getPlayers,
        getPlayerById: _getPlayerById,
        createPlayer: _createPlayer,
        deletePlayer: _deletePlayer,
        getAllTournaments: _getTournaments,
        getMatchById: _getMatchById,
        createMatch: _createMatch,
        deleteMatch: _deleteMatch
    }
}
