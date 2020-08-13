module.exports = (express) => {
    const tournamentRouter = express.Router();

    tournamentRouter.route('/all').get((req, res) => {
        // console.log('router /api/tournaments');
        dbConnection.getAllTournaments().then((tournaments) => {
            // console.log('tournaments', tournaments);
            res.status(200).json(tournaments);
        });
    }, errorHandler);


    function errorHandler(error) {
        console.log('Error', error);
    }

    return tournamentRouter;
}