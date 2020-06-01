module.exports = (mongoose) => {

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

    return {
        Schema: _match,
        model: mongoose.model('Match', _match)
    }
}
