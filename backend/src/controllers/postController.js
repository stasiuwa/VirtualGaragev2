const Car= require('../models/Car')

const getAllPosts = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id, {}, null);
        // if (posts === null) return res.status(404).json({ message: "Posts not found!"});
        res.status(200).json(car.posts);
    } catch (error) {
        res.status(500).json({ message: error, function: "postController.getAllPosts" });
    }
}
const createPost = async (req, res) => {
    try {
        const { type, date, mileage, details, price } = req.body;
        const car = await Car.findById(req.params.id, {}, null);
        const post = {
            type: type, date: date, mileage: mileage, details: details, price: price
        };
        car.posts.push(post)
        await car.save().then(res.status(201).send("Post Created!"))
        // await post.save().then(res.status(201).send("Post Created!"));
    } catch (error) {
        res.status(500).json({ message: error, function: "postController.createPost" });
    }
}
const getPost = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id, {}, null);
        const postId = req.params.postId;

        res.status(200).json(car.posts.find(post => post.id === postId));
    } catch (error) {
        res.status(500).json({ message: error, function: "postController.getPost" });
    }
}
const updatePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const car = await Car.findById(req.params.id, {}, null);
        // const { type, date, mileage, details, price } = req.body;

        Object.assign(car.posts.find(post => post.id === postId), req.body);
        await car.save();
        res.status(201).send("Post Updated!");

    } catch (error) {
        res.status(500).json({ message: error, function: "postController.updatePost" });
    }
}
const deletePost = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id, {}, null);
        const postId = req.params.postId;

        const postIndex = car.posts.findIndex(post => post.id === postId);
        if ( postIndex === -1 ){
            return res.status(404).send("Post not found");
        }

        car.posts.splice(postIndex, 1);
        await car.save();
        res.status(200).send("Post deleted!");

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