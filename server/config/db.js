require('dotenv').config()

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const mongoose = require('mongoose');
// const Transaction = require("../models/transaction");
//
// const types = [
//     'Bills',
//     'Car',
//     'Clothes',
//     'Communication',
//     'Eating Out',
//     'Entertainment',
//     'Food',
//     'Gifts',
//     'Health',
//     'House',
//     'Pets',
//     'Sports',
//     'Taxi',
//     'Toiletry',
//     'Transport'
// ];

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // seedTestData();
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

// RANDOM DATA FOR 2024
// async function seedTestData() {
//     try {
//         const userId = '684090a24dfff4a3439337d7';
//         const testTransactions = [];
//
//         const currentYear = new Date().getFullYear();
//         const lastYear = currentYear - 1;
//
//         for (let month = 0; month < 12; month++) {
//             // Add one income transaction for the month
//             const incomeDate = new Date(lastYear, month, Math.ceil(Math.random() * 28)); // Income on a random day
//             testTransactions.push({
//                 userId,
//                 amount: 50000,
//                 description: 'Monthly income',
//                 type: 'income',
//                 category: 'Income',
//                 createdAt: incomeDate,
//                 updatedAt: incomeDate,
//             });
//
//             // Add outcome transactions for the month
//             let remainingOutcome = 50000;
//             const numCategories = types.length;
//             const outcomeDate = new Date(lastYear, month, Math.ceil(Math.random() * 28));
//
//             types.forEach((category, index) => {
//                 // Distribute the outcome transactions approximately
//                 const value =
//                     index !== numCategories - 1
//                         ? Math.floor(Math.random() * (remainingOutcome / (numCategories - index))) + 1
//                         : remainingOutcome; // Ensure last category matches remaining value.
//
//                 remainingOutcome -= value;
//
//                 testTransactions.push({
//                     userId,
//                     amount: value,
//                     description: `Expense for ${category}`,
//                     type: 'outcome',
//                     category,
//                     createdAt: outcomeDate,
//                     updatedAt: outcomeDate,
//                 });
//             });
//         }
//
//         await Transaction.insertMany(testTransactions);
//         console.log('Seeded test data for the previous year successfully!');
//         await mongoose.disconnect();
//     } catch (err) {
//         console.error('Error seeding data:', err.message);
//         process.exit(1);
//     }
// }

// RANDOM DATA FOR 2025
// async function seedTestData() {
//     try {
//         const userId = '684090a24dfff4a3439337d7';
//         const testTransactions = [];
//
//         const currentYear = new Date().getFullYear();
//         const today = new Date();
//
//         // Generate data for each month of the current year, up to today
//         for (let month = 0; month <= today.getMonth(); month++) {
//             // Set days limit for income and outcome transactions
//             const daysInMonth = month === today.getMonth() ? today.getDate() : 28; // Up to the current day or 28 days
//
//             // Add one income transaction for the month
//             const incomeDate = new Date(currentYear, month, Math.ceil(Math.random() * daysInMonth));
//             testTransactions.push({
//                 userId,
//                 amount: 50000,
//                 description: 'Monthly income',
//                 type: 'income',
//                 category: 'Income',
//                 createdAt: incomeDate,
//                 updatedAt: incomeDate,
//             });
//
//             // Add outcome transactions for the month
//             let remainingOutcome = 50000;
//             const numCategories = types.length;
//             const outcomeDate = new Date(currentYear, month, Math.ceil(Math.random() * daysInMonth));
//
//             types.forEach((category, index) => {
//                 // Distribute the outcome transactions approximately
//                 const value =
//                     index !== numCategories - 1
//                         ? Math.floor(Math.random() * (remainingOutcome / (numCategories - index))) + 1
//                         : remainingOutcome; // Ensure last category matches remaining value.
//                 remainingOutcome -= value;
//                 testTransactions.push({
//                     userId,
//                     amount: value,
//                     description: `Expense for ${category}`,
//                     type: 'outcome',
//                     category,
//                     createdAt: outcomeDate,
//                     updatedAt: outcomeDate,
//                 });
//             });
//         }
//
//         await Transaction.insertMany(testTransactions);
//         console.log('Seeded test data for the current year successfully!');
//         await mongoose.disconnect();
//     } catch (err) {
//         console.error('Error seeding data:', err.message);
//         process.exit(1);
//     }
// }

// seedTestData();
module.exports = { connectDB };
