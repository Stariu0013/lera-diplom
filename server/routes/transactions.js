require('dotenv').config();

const express = require('express');
const Transaction = require('../models/transaction');
const {verify} = require("jsonwebtoken");
const router = express.Router();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied, token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

router.get('/', authMiddleware, async (req, res) => {
    try {
        const data = await Transaction.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        // Add the authenticated user's ID to the transaction
        const newTx = new Transaction({ ...req.body, userId: req.user.userId });
        const saved = await newTx.save();
        res.json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        // Ensure the transaction belongs to the logged-in user
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId,
        });

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found or unauthorized' });
        }

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/bulk', authMiddleware, async (req, res) => {
    try {
        // Extract transactions from request body
        const transactions = req.body;

        if (!Array.isArray(transactions)) {
            return res.status(400).json({ error: 'Input must be an array of transactions' });
        }

        // Add the authenticated user's ID and required fields to each transaction
        const processedTransactions = transactions.map(transaction => ({
            ...transaction,
            userId: req.user.userId,
            createdAt: new Date(),
            updatedAt: new Date() // Same as createdAt
        }));

        // Insert transactions in bulk
        const savedTransactions = await Transaction.insertMany(processedTransactions);

        // Return the saved transactions
        res.json(savedTransactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;