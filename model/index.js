const mongoose = require('mongoose');

module.exports = () => {
    const connect = () => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
        const HOST = 'mongodb://localhost:27017/my_database';
        mongoose.connect(HOST, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                console.log('mongodb connection error', err);
            } else {
                console.log('mongodb connection success');
            }
        });
    };

    connect();
    mongoose.connection.on('error', (err) => {
        if (err) {
            console.log('mongodb connection error', err);
        } else {
            console.log('mongodb connection success');
        }
    });

  mongoose.connection.on('disconnected', () => {
    console.log('mongodb connection is lost, trying to re-connect to mongodb.');
    connect();
  });
};
