module.exports = (express, dbConnection) => {
  const twitchWebhook = express.Router();

  twitchWebhook.route('/callback').get((req, res) => {
    res.status(200).json({});     
  }, errorHandler);

  function errorHandler(error) {
      console.log('Error', error);
  }

  return twitchWebhook;
}