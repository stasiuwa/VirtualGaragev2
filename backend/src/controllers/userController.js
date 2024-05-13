const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const jwtKey = "kluczTestowy123";

const register = async (req, res) => {
    const newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    try {
        await newUser.save()
        res.status(200).send("User registered successfully!");
    } catch (err) {
        res.status(500).send({error: err.message, function: "userController.register"})
    }
};
const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }, {}, null).exec();

        if (!user || !user.password) {
            return res.status(401).send({ message: "Authentication failed. Invalid user or password." });
        }

        return res.json({
            token: jwt.sign({
                email: user.email,
                username: user.username,
                _id: user._id,
            }, jwtKey)
        });
    } catch (err) {
        return res.status(500).send({ error: err.message, message: "Internal server error." });
    }
}
const loginRequired =  (req, res, next) => {
    try {
        if (req.user) {
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized user!' });
        }
    } catch (err) {
        next(err);
    }
}
const profile = (req, res, next) => {
    try {
        if (req.user) {
            res.send(req.user);
            next();
        } else {
            return res.status(401).json({ message: 'Invalid token!' });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    register,
    login,
    loginRequired,
    profile
}