const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        unique: [true, "Taki użytkownik już istnieje"],
        trim: true,
        required: [true, "Musisz podać nazwe użytkownika jak chcesz być użytkownikiem"]
    },
    email: {
        type: String,
        unique: [true, "Ten email jest zajęty, znajdź se nowy"],
        lowercase: true,
        trim: true,
        required: [true, "No jak zalozysz konto bez maila?"]
    },
    password: {
        type: String,
        required: [true, "PODAJ HASŁO"]
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