const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
    account: String,
    amount: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Transfer = mongoose.model('Transfer', transferSchema, 'transfers');

module.exports = Transfer;