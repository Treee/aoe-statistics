module.exports = {
    startServer: (mongoose) => {
        mongoose.connect('mongodb://itsatreee.com', { useNewUrlParser: true });
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log('connected!');        // we're connected!
        });
    }
}
