const Car= require('../models/Car')

const getAllPosts = async (req, res) => {
    try {
        console.log(req.params.id);
        const car = await Car.findById(req.params.id, {}, null);
        if (car === null) return res.status(404).send({message: "Car not found!"});
        if (car.posts === null) return res.status(404).send({ message: "Posts not found!"});
        console.log(car.posts);
        res.status(200).send(car.posts);
    } catch (error) {
        res.status(500).send({ error: error, function: "postController.getAllPosts" });
    }
}
const createPost = async (req, res) => {
    try {
        console.log("CREATEPOST REQ.BODY: " + req.body.carID + "req.params.id = " + req.params.carID);
        const { carID, type, date, mileage, details, price } = req.body;

        if (carID === '') return res.status(404).send({message: "Empty CarID!"});
        const car = await Car.findById(carID, {}, null);
        if (car === null) return res.status(404).send({message: "Car not found!"});

        const post = {
            carID: carID,
            type: type, date: date, mileage: mileage, details: details, price: price
        };
        car.posts.push(post)
        await car.save();
        return res.status(201).send("Post Created!");
        // await post.save().then(res.status(201).send("Post Created!"));
    } catch (error) {
        res.status(500).send({ error: error, function: "postController.createPost" });

    }
}
const getPost = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id, {}, null);
        if (car === null) return res.status(404).send({message: "Car not found!"});

        const postId = req.params.postId;

        res.status(200).send(car.posts.find(post => post.id === postId));
    } catch (error) {
        res.status(500).send({ error: error, function: "postController.getPost" });
    }
}
const updatePost = async (req, res) => {
    try {
        console.log(req.params);
        const postId = req.params.postId;
        const car = await Car.findById(req.params.id, {}, null);
        if (car === null) return res.status(404).send({message: "Car not found!"});

        Object.assign(car.posts.find(post => post.id === postId), req.body);
        await car.save();
        res.status(201).send("Post Updated!");

    } catch (error) {
        res.status(500).send({ error: error, function: "postController.updatePost" });
    }
}
const deletePost = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id, {}, null);
        if (car === null) return res.status(404).send({message: "Car not found!"});

        const postId = req.params.postId;

        const postIndex = car.posts.findIndex(post => post.id === postId);

        car.posts.splice(postIndex, 1);
        await car.save();
        res.status(200).send("Post deleted!");

    } catch (error) {
        res.status(500).send({ error: error, function: "postController.deletePost" });
    }
}

module.exports = {
    getAllPosts,
    createPost,
    getPost,
    updatePost,
    deletePost,
};