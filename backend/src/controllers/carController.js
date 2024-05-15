const Car = require('../models/Car');
const { validationResult } = require('express-validator');

const getAllCars = async (req, res) => {
    try {
        console.log(req.user);
        const userID = req.user._id;
        const cars = await Car.find({
             userID: userID
        }, {}, null);
        if (cars === null) return res.status(404).json({ message: "Cars not found" });
        res.status(200).json(cars);
        console.log(cars);
    } catch (err) {
        res.status(500).json({error: err, function: "carController.getAllCars"});
    }
}

const createCar = async (req, res) => {
    try {
        // walidacja
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

        const userID = req.user._id;
        const { brand, model, car_year, engine, mileage } = req.body;
        // console.log(" carController.createCar - req: " + req.body);
        const car = new Car({
            userID: userID,
            brand: brand, model: model, car_year: car_year, engine: engine, mileage: mileage
        });
        await car.save();
        res.status(201).send("Car Created");
    } catch (err) {
        res.status(500).send({error: err, function: "carController.createCar"})
    }
}
const getCar = async (req, res) => {
    try {
        const car = await Car.findOne({_id: req.params.id, userID: req.user._id}, {}, null);
        if (car === null) return res.status(404).send({message: "Car not found!"});
        res.status(200).json(car);
    } catch (err) {
        res.status(500).json({error: err, function: "carController.getCar"});
    }
}
const updateCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const { brand, model, car_year, engine, mileage } = req.body;
        // walidacja
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
        await Car.updateOne(
            {
                _id: carId,
                userID: req.user._id,
            },
            {
                brand: brand,
                model: model,
                car_year: car_year,
                engine: engine,
                mileage: mileage
            },
            null
        );
        res.status(200).send("Car updated!");
    } catch (err) {
        res.status(500).json({error: err, function: "carController.updateCar"})
    }
}
const deleteCar = async (req, res) => {
    try {
        await Car.deleteOne(
            {
                _id: req.params.id,
                userID: req.user._id,
            },
            {}
        ).then(res.status(200).send("Car deleted!"));
    } catch (err) {
        res.status(500).json({error: err, function: "carController.deleteCar"})
    }
}

module.exports = {
    getAllCars,
    createCar,
    getCar,
    updateCar,
    deleteCar,
};