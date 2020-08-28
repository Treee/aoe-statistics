module.exports = (express, dbConnection) => {
  const twitchWebhook = express.Router();

  twitchWebhook.route('/follows').get((req, res) => {
    // in the future check the hub challenge to make sure it is correct
    // sha256(secret, notification_bytes).
    console.log(req);
    res.status(200).send(req.query['hub.challenge']);     
  }, errorHandler);

  function errorHandler(error) {
      console.log('Error', error);
  }

  return twitchWebhook;
}