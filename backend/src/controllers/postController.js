const Post = require('../models/Post');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).then((cars) => { console.log(posts) });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const createPost = async (req, res) => {

}
const getPost = async (req, res) => {

}
const updatePost = async (req, res) => {

}
const deletePost = async (req, res) => {

}

module.exports = {
    getAllPosts,
    createPost,
    getPost,
    updatePost,
    deletePost,
};