const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        type: { type: String, enum: ['income', 'outcome'], required: true },
        description: String,
        amount: Number,
        category: String
    },
    { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
