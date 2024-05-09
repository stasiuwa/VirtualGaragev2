const express = require('express');
const router = express.Router();

const { getAllCars, createCar, getCar, updateCar, deleteCar } = require('../controllers/carController')

router.get('/', getAllCars);
router.post('/', createCar);
router.get('/:id', getCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

module.exports = router;