const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
/**
 * Funkcja porównujaca hasło z hashem w bazie danych
 * @param password hasło podane do sprawdzenia
 * @returns {*}
 */
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema, 'users');