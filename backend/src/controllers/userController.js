const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const {JWT_KEY} = require('../middleware/loginRequired')

const register = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
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

        const token = jwt.sign({
                email: user.email,
                username: user.username,
                _id: user._id,
            }, JWT_KEY, { expiresIn: '1h' });

        // Dodanie tokenu do cookies
        return res.cookie("access_token", token, { httpOnly: true, secure: true }).status(200).json({ message: "You are logged in!"});
    } catch (err) {
        return res.status(500).send({ error: err.message, message: "Internal server error." });
    }
}
const logout = async (req, res) => {
    return res.clearCookie("access_token").status(200).json({ message: "You are logged out!" });
};

const profile = async (req, res) => {
    try {
        if (req.user) {
            const user = await User.findById(req.user._id, {}, null);
            res.status(200).json(user);
        } else {
            return res.status(401).json({ message: 'Invalid token!' });
        }
    } catch (err) {
        return res.status(500).json({ error: "Internal server error! userController/profile()"});
    }
};

module.exports = {
    register,
    login,
    logout,
    // loginRequired,
    profile
}