const mongoose = require('mongoose');

const post = new mongoose.Schema({
    type: String,
    date: String,
    mileage: String,
    details: String,
    price: String,
});

const carSchema = new mongoose.Schema({
    brand: String,
    model: String,
    car_year: String,
    engine: String,
    mileage: String,
    posts: [post]
});

module.exports = mongoose.model('Car', carSchema);