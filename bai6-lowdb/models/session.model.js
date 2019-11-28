const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: {
        type: Array
    }
});

const Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;