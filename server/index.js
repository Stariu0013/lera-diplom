require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const transactionRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth');
const analysisRoutes = require('./routes/analysis');
const subscriptionRoutes = require('./routes/subscribe');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/', analysisRoutes);
app.use('/api/', subscriptionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
