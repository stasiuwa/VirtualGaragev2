const Post = require('../models/Post');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}, {}, null);
        // if (posts === null) return res.status(404).json({ message: "Posts not found!"});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error, function: "postController.getAllPosts" });
    }
}
const createPost = async (req, res) => {
    try {
        const { type, date, mileage, details, price } = req.body;
        const post = new Post({
            type: type, date: date, mileage: mileage, details: details, price: price
        });
        await post.save().then(res.status(201).send("Post Created!"));
    } catch (error) {
        res.status(500).json({ message: error, function: "postController.createPost" });
    }
}
const getPost = async (req, res) => {
    try {
        // res.status(200).json( await Post.findById(req.params.id) );
        const post = await Post.findById(req.params.id, {}, null);
        // if(!post) return res.status(404).json("Post not found!");
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error, function: "postController.getPost" });
    }
}
const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { type, date, mileage, details, price} = req.body;
        await Post.updateOne(
            { _id: postId},
            {
                type: type,
                date: date,
                mileage: mileage,
                details: details,
                price: price
            },
        ).then(res.status(200).send("Post updated!"));
    } catch (error) {
        res.status(500).json({ message: error, function: "postController.updatePost" });
    }
}
const deletePost = async (req, res) => {
    try {
        await Post.deleteOne(
            { _id: req.params.id},
            {}
        ).then(res.status(200).send("Post deleted!"))
    } catch (error) {
        res.status(500).json({ message: error, function: "postController.deletePost" });
    }
}

module.exports = {
    getAllPosts,
    createPost,
    getPost,
    updatePost,
    deletePost,
};