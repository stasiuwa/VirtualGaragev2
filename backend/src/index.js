const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Database connection
mongoose.connect('mongodb://localhost:27017/')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('api/cars', carRoutes);
app.use('api/cars/:id/', postRoutes);
app.get('/test', (req, res) => {
    res.json({message: "test"});
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})