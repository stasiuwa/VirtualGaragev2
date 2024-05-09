const Car = require('../models/Car');

const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({});
        if (!cars) return res.status(404).json({ message: "Cars not found" });
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
            brand: brand,
            model: model,
            car_year: car_year,
            engine: engine,
            mileage: mileage
        });
        console.log("CAR = " + car);
        await car.save();
        res.send("Car Created");
    } catch (err) {
        res.status(500).json({error: err, function: "carController.createCar"})
    }
}
const getCar = async (req, res) => {
    try {
        const carID = req.params.id;
        console.log(" carController.getCar - ID odebrane z req: " + carID);
        const car = await Car.findById(carID);
        if (!car) return res.status(404).json({ message: "Car not found" });
        res.status(200).json(car);

    } catch (err) {
        if (err.kind === 'ObjectID') return res.status(401).json({ message: "Invalid ID format" });
        console.log(err);
        res.status(500).json({error: err, function: "carController.getCar"});
    }
}
const updateCar = async (req, res) => {
    try {
        const carID = req.params.id;
        const { brand, model, car_year, engine, mileage } = req.body;
        console.log(" carController.updateCar - req.body: " + brand + model + car_year);
        await Car.updateOne(
            { _id: carID },
            {
                brand: brand,
                model: model,
                car_year: car_year,
                engine: engine,
                mileage: mileage
            }
        )
        res.status(200).send("Car updated!");
    } catch (err) {
        res.status(500).json({error: err, function: "carController.updateCar"})
    }
}
const deleteCar = async (req, res) => {
    try {
        const carID = req.params.id;
        console.log(" carController.deleteCar - ID odebrane z req: " + carID);
        await Car.deleteOne({_id: carID}, {});
        res.status(200).send("Car deleted!");
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