const express = require('express');
const router = express.Router();

// walidacja
const { body } = require('express-validator');
const carValidationRules = () => {
    return [
        body('brand').notEmpty().trim().escape(),
        body('model').notEmpty().trim().escape(),
        body('car_year').notEmpty().isNumeric(),
        body('engine').notEmpty().trim().escape(),
        body('mileage').notEmpty().isNumeric(),
    ]
}
const postValidationRules = () => {
    return [
        body('type').notEmpty().isLength({ max: 32 }).trim().escape(),
        body('date').optional().isISO8601(),
        body('mileage').notEmpty().isInt({ min: 0 }),
        body('details').notEmpty().trim().escape(),
        body('price').optional().isFloat({ min: 0 })
    ]
}


const { loginRequired } = require('../controllers/userController');

router.use(loginRequired);

const { getAllCars, createCar, getCar, updateCar, deleteCar } = require('../controllers/carController')

router.get('/', getAllCars, );
router.post('/', createCar);
router.get('/:id', getCar);
router.put('/:id', carValidationRules, updateCar);
router.delete('/:id', deleteCar);

const { getAllPosts, createPost, getPost, updatePost, deletePost } = require("../controllers/postController");

router.get('/:id/posts', getAllPosts);
router.post('/:id/posts', postValidationRules, createPost);
router.get('/:id/posts/:postId', getPost);
router.put('/:id/posts/:postId', postValidationRules, updatePost);
router.delete('/:id/posts/:postId', deletePost);

module.exports = router;