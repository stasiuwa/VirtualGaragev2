const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const jwtKey = "kluczTestowy123";

const app = express();

const PORT = process.env.PORT || 5000;
const ATLAS_URI = 'mongodb://localhost:27017/garage';

//Ciasteczka
app.use(cookieParser());

//Middleware
app.use(cors({ origin: "http://localhost:8080" , credentials: true}));
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
app.use('/api/users', userRoutes);
app.use(function(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    jsonwebtoken.verify(token, jwtKey, (err, decodedToken) => {
        if (err) {return res.status(401).json({ message: 'Unable to verify token!' }); }
        req.user = decodedToken;
        next();
    })
});
app.use('/api/cars', carRoutes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})