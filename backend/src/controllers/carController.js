const Car = require('../models/Car');

const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({}, {}, null);
        // if (!cars) return res.status(404).json({ message: "Cars not found" });
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({error: err, function: "carController.getAllCars"});
    }
}
const createCar = async (req, res) => {
    try {
        const { brand, model, car_year, engine, mileage } = req.body;
        console.log(" carController.createCar - req: " + req.body);
        const car = new Car({
            brand: brand, model: model, car_year: car_year, engine: engine, mileage: mileage
        });
        await car.save().then(res.status(201).send("Car Created"));
    } catch (err) {
        res.status(500).json({error: err, function: "carController.createCar"})
    }
}
const getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id, {}, null);
        if (!car) return res.status(404).json({ message: "Car not found" });
        res.status(200).json(car);
    } catch (err) {
        res.status(500).json({error: err, function: "carController.getCar"});
    }
}
const updateCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const { brand, model, car_year, engine, mileage } = req.body;
        await Car.updateOne(
            {
                _id: carId
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
            {_id: req.params.id},
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