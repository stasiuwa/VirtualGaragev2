const mongoose = require('mongoose');

const post = new mongoose.Schema({
    type: {
        type: String,
        maxLength: 32,
        required: true
    },
    date: {
        type: String,
        required: false
    },
    mileage: {
        type: Number,
        min: 0,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: false,
    },
});

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        maxLength: 32,
        required: true
    },
    model: {
        type: String,
        maxLength: 32,
        required: true
    },
    car_year: {
        type: Number,
        min: 1950,
        max: new Date().getFullYear()
    },
    engine: {
        type: String,
        maxLength: 16,
        required: true
    },
    mileage: {
        type: String,
        required: true
    },
    posts: [post]
});

module.exports = mongoose.model('Car', carSchema);