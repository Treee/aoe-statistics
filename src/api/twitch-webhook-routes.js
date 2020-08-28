module.exports = (express, dbConnection) => {
  const twitchWebhook = express.Router();

  twitchWebhook.route('/follows').get((req, res) => {
    console.log(req.query);
    console.log(req.params);
    console.log(req.url);
    res.status(200).send(req.query['hub.challenge']);     
  }, errorHandler);

  function errorHandler(error) {
      console.log('Error', error);
  }

  return twitchWebhook;
}