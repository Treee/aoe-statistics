module.exports = (mongoose) => {
    const _match = require("./match")(mongoose).Schema;
    const _player = new mongoose.Schema({
        name: String,
        team: String,
        matches: [_match]
    });

    return {
        Model: mongoose.model('Player', _player)
    }
}