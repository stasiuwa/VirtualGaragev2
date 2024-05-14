const express = require('express');
const router = express.Router();

const { register, login, logout, profile } = require('../controllers/userController');
const { loginRequired } = require("../middleware/loginRequired");

router.post('/register', register);
router.post('/login', login);

router.use(loginRequired);
router.get('/logout', logout);
router.get('/profile', profile);

module.exports = router;

