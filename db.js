const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

// Setup MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Default connection
const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connected!');
});

db.on('error', (err) => {
    console.log('Error occurred!', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected!');
});

module.exports = db;
