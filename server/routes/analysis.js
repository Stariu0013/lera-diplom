const express = require('express');
const router = express.Router();

const STATIC_INFLATION_RATE = 100.7;

router.post('/analysis', async (req, res) => {
    try {
        const inflationRate = 101.5;
        const { transactions, months, budget } = req.body;
        const expensesByMonth = {};
        const incomeByMonth = {};
        const outcomeTransactions = transactions.filter(t => t.type === 'outcome');

        for (const t of transactions) {
            const month = new Date(t.createdAt).toISOString().slice(0, 7);

            if (t.type === 'outcome') {
                expensesByMonth[month] = (expensesByMonth[month] || 0) + t.amount;
            } else if (t.type === 'income') {
                incomeByMonth[month] = (incomeByMonth[month] || 0) + t.amount;
            }
        }

        const lastKMonths = Object.keys(expensesByMonth).sort().slice(-3); // k = 3
        const avgExpense = lastKMonths.length > 0
            ? lastKMonths.reduce((sum, month) => sum + expensesByMonth[month], 0) / lastKMonths.length
            : 0;

        const forecast = avgExpense * Math.pow(1 + ((STATIC_INFLATION_RATE - inflationRate) / 100), 1);
        const overBudget = forecast > budget;

        const totalExpenses = outcomeTransactions.reduce((sum, t) => sum + t.amount, 0);
        const categoryStats = outcomeTransactions.reduce((stats, t) => {
            stats[t.category] = (stats[t.category] || 0) + t.amount;
            return stats;
        }, {});

        for (const category in categoryStats) {
            categoryStats[category] = ((categoryStats[category] / totalExpenses) * 100).toFixed(2);
        }

        res.json({
            forecast: {
                averageExpense: Math.round(avgExpense),
                predictedExpense: Math.round(forecast),
                overBudget
            },
            categoryStats,
            monthlyIncome: incomeByMonth
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;