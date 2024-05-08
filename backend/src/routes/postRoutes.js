const express = require('express');
const router = express.Router();

const { getAllPosts, createPost, getPost, updatePost, deletePost } = require('../controllers/postController')

router.get('/', getAllPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;