const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
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

app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);

// app.get('*', (req, res) => {
//     res.status(404).send("TUTAJ NIC NIE ZNAJDZIESZ");
// })

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})