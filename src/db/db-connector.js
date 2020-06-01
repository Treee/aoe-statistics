module.exports = (mongoose, user, password) => {
    function _connectToDB(table) {
        mongoose.connect(`mongodb://${user}:${password}@itsatreee.com${'/' + table}`, { useNewUrlParser: true });
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

    async function getPlayers() {
        console.log('db');
        const PlayerModel = mongoose.model('Player', _player);
        const query = PlayerModel.find({});
        return await query.exec().then((results) => {
            console.log('results', results);
            return results;
        });
    }

    return {
        MatchModel: mongoose.model('Match', _match),
        PlayerModel: mongoose.model('Player', _player),
        startServer: _connectToDB,
        getAllPlayers: getPlayers
    }
}
