module.exports = (express, dbConnection) => {
  const twitchWebhook = express.Router();

  twitchWebhook.route('/callback').get((req, res) => {
    console.log(req);
    console.log(req.body);
    res.status(200).send("");     
  }, errorHandler);

  function errorHandler(error) {
      console.log('Error', error);
  }

  return twitchWebhook;
}