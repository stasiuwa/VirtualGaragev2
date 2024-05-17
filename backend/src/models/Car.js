const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const post = new mongoose.Schema({
    // carID: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Car',
    //     required: true
    // },
    type: {
        type: String,
        maxLength: [32, "Maksymalna ilość znaków: 32!"],
        required: [true, "Pole typ wpisu jest wymagane!"]
    },
    date: {
        type: String,
        required: false
    },
    mileage: {
        type: Number,
        min: [0, "MNIEJ NIZ ZEROOOO przebiegu jest niemozliwe ;)"],
        required: [true, "Pole przebieg jest wymagane!"]
    },
    details: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        min: [0, "Taniej niz za darmo ( 0 ) to sie nie da chyba nie?"],
        required: false,
    },
});

const carSchema = new mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    brand: {
        type: String,
        maxLength: [32, "Maksymalna ilość znaków: 32!"],
        required: [true, "Pole marka jest wymagane!"]
    },
    model: {
        type: String,
        maxLength: [32, "Maksymalna ilość znaków: 32!"],
        required: [true, "Pole model jest wymagane!"]
    },
    car_year: {
        type: Number,
        min: [1950, "Nie przyjmujemy gratów zrobionych przed 1950 rokiem, to jeszcze jeździ? O:"],
        max: [new Date().getFullYear(), "Jeszcze auto nie złożone jak z następnego roku??"]
    },
    engine: {
        type: String,
        maxLength: [16, "Maksymalna ilość znaków: 16!"],
        required: [true, "Pole silnik jest wymagane!"]
    },
    mileage: {
        type: Number,
        min: [0, "MNIEJ NIZ ZEROOOO przebiegu jest niemozliwe ;)"],
        required: [true, "Pole przebieg jest wymagane!"]
    },
    posts: [post]
});

module.exports = mongoose.model('Car', carSchema, 'cars');