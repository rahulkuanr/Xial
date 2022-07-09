const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/xial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to DB'));

db.once('open', () => {
    console.log('Connected to Database');
});

module.exports = db;