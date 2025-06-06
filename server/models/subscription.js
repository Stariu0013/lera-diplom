const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;
