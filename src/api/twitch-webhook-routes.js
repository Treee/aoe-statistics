module.exports = (express, dbConnection) => {
  const twitchWebhook = express.Router();

  twitchWebhook.route('/follows').get((req, res) => {
      // in the future check the hub challenge to make sure it is correct
      // sha256(secret, notification_bytes).
      const x = req.query['hub.challenge'];
      console.log(x);
      console.log(req.query['hub.challenge']);
      res.setHeader('content-type', 'text/plain');
      res.status(200).send(req.query['hub.challenge']);
    }, errorHandler)
    .post((req, res) => {
      res.status(200).send(req.body);
    }, errorHandler);

  function errorHandler(error) {
    console.log('Error', error);
  }

  return twitchWebhook;
}