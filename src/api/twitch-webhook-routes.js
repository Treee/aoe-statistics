module.exports = (express, dbConnection) => {
  const playerRouter = express.Router();

  playerRouter.route('/callback').get((req, res) => {
    console.log("stuff", req);
    res.status(200).json({});     
  }, errorHandler);

  // playerRouter.route('/:id')
  //     .get((req, res) => {
  //         console.log('get by id', req.params.id);
  //         dbConnection.getPlayerById(req.params.id).then((players) => {
  //             console.log('players', players);
  //             res.status(200).json(players);
  //         });
  //     }, errorHandler)
  //     .post((req, res) => {
  //         console.log(`player body: ${req.body} params: ${req.params}`);
  //         dbConnection.createPlayer(req.body.name, req.body.team).then((newPlayer) => {
  //             console.log('newPlayer', newPlayer);
  //             res.status(200).json(newPlayer);
  //         });
  //     }, errorHandler)
  //     .delete((req, res) => {
  //         console.log(`delete player body: ${req.body} params: ${req.params}`);
  //         const playerId = req.params.id || req.body.id;
  //         dbConnection.deletePlayer(playerId).then(() => {
  //             console.log('deletePlayer');
  //             res.status(200).json({});
  //         });
  //     }, errorHandler);

  function errorHandler(error) {
      console.log('Error', error);
  }

  return playerRouter;
}