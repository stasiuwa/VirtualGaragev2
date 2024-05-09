const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

const PORT = process.env.PORT || 5000;
const ATLAS_URI = 'mongodb://localhost:27017/garage'

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
})

app.use('/api/cars', carRoutes);
app.use('/api/cars/:id/', postRoutes);

// app.get('/test', async (req, res) => {
//     try {
//         const cars = await req.db.collection('cars').find().toArray();
//         res.json(cars);
//     } catch (err) {
//         res.status(500).json({error: err});
//     }
// })

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})