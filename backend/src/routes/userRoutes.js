const express = require('express');
const router = express.Router();

const { register, login, loginRequired, profile } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', profile);

module.exports = router;

