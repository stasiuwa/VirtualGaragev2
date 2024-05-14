const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');
const jsonwebtoken = require('jsonwebtoken');

const jwtKey = "kluczTestowy123";

const app = express();

const PORT = process.env.PORT || 5000;
const ATLAS_URI = 'mongodb://localhost:27017/garage';

//Middleware
app.use(cors({ origin: "http://localhost:8080" }));
app.use(express.json());

//Database connection
mongoose.connect(ATLAS_URI)
    .then(() => {
            console.log('MongoDB connected');
        })
    .catch(err => console.log(err));

app.use((req, res, next) => {
    req.db = mongoose.connection;
    next();
});

/**
 * Middleware do uwierzytelniania
 */
app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], jwtKey, function(err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})