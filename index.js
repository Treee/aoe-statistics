var mongoose = require('mongoose');
mongoose.connect('mongodb://itsatreee.com', { useNewUrlParser: true });
// mongoose.connect('mongodb://itsatreee.com', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});