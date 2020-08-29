module.exports = (express, dbConnection) => {
  const twitchWebhook = express.Router();

  twitchWebhook.route('/follows').get((req, res) => {
      // in the future check the hub challenge to make sure it is correct
      // sha256(secret, notification_bytes).
      const hubChallenge = req.query['hub.challenge'];
      res.setHeader('content-type', 'text/plain');
      res.status(200).send(JSON.stringify(hubChallenge));
    }, errorHandler)
    .post((req, res) => {
      console.log('post follow request', req.body);
      res.status(200).send(req.body);
    }, errorHandler);

  function errorHandler(error) {
    console.log('Error', error);
  }

  return twitchWebhook;
}