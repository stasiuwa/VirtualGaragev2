const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: String,
    model: String,
    car_year: String,
    engine: String,
    mileage: String,
});

module.exports = mongoose.model('Car', carSchema);