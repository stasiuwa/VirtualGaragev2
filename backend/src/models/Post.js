const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    type: String,
    date: String,
    mileage: String,
    details: String,
    price: String,
});

module.exports = mongoose.model('Post', postSchema);