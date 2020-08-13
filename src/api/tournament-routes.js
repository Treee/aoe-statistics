module.exports = (express, dbConnection) => {
    const tournamentRouter = express.Router();

    tournamentRouter.route('/all').get((req, res) => {
        console.log('router /api/tournaments');
        dbConnection.getAllTournaments().then((tournaments) => {
            console.log('tournaments', tournaments);
            res.status(200).json(tournaments);
        });
    }, errorHandler);

    tournamentRouter.route('/:id')
        .get((req, res) => {
            console.log('get by id', req.params.id);
            dbConnection.getMatchById(req.params.id).then((match) => {
                console.log('match', match);
                res.status(200).json(match);
            });
        }, errorHandler)
        .post((req, res) => {
            console.log(`match body: ${req.body} params: ${req.params}`);
            dbConnection.createMatch(req.body.tournamentName, req.body.phase, req.body.stage, req.body.group, req.body.match, req.body.game, req.body.civPlayed, req.body.mapPlayed, req.body.winner, req.body.position).then((newMatch) => {
                console.log('createMatch', newMatch);
                res.status(200).json(newMatch);
            });
        }, errorHandler)
        .delete((req, res) => {
            console.log(`delete match body: ${req.body} params: ${req.params}`);
            const matchId = req.params.id || req.body.id;
            dbConnection.deleteMatch(matchId).then(() => {
                console.log('deleteMatch');
                res.status(200).json({});
            });
        }, errorHandler);

    function errorHandler(error) {
        console.log('Error', error);
    }

    return tournamentRouter;
}