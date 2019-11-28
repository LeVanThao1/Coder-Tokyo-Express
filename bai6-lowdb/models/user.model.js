const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String,
        min: 6,
        max: 30
    }
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;