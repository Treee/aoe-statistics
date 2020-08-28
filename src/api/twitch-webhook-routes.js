module.exports = (express, dbConnection) => {
  const twitchWebhook = express.Router();

  twitchWebhook.route('/follows').get((req, res) => {
    console.log('query', req.query);
    const x = req.query.hub;
    console.log('x', x);
    res.status(200).send(req.query);     
  }, errorHandler);

  function errorHandler(error) {
      console.log('Error', error);
  }

  return twitchWebhook;
}