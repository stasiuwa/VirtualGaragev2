const express = require('express');
const router = express.Router();

const { getAllCars, createCar, getCar, updateCar, deleteCar } = require('../controllers/carController')
const { getAllPosts, createPost, getPost, updatePost, deletePost } = require("../controllers/postController");

router.get('/', getAllCars);
router.post('/', createCar);
router.get('/:id', getCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

router.get('/:id/posts', getAllPosts);
router.post('/:id/posts', createPost);
router.get('/:id/posts/:postId', getPost);
router.put('/:id/posts/:postId', updatePost);
router.delete('/:id/posts/:postId', deletePost);

module.exports = router;