function getCategoryInsights(categoryStats) {
    const entries = Object.entries(categoryStats).map(([category, percentage]) => ({
        category,
        percentage: parseFloat(percentage),
    }));

    const mostExpensive = entries.reduce((max, curr) => (curr.percentage > max.percentage ? curr : max));
    const leastExpensive = entries.reduce((min, curr) => (curr.percentage < min.percentage ? curr : min));

    return {
        mostExpensiveCategory: mostExpensive.category,
        mostExpensivePercentage: mostExpensive.percentage,
        leastExpensiveCategory: leastExpensive.category,
        leastExpensivePercentage: leastExpensive.percentage,
    };
}

function getOverBudgetMessage(overBudget, averageExpense, predictedExpense, monthlyIncome, inflationRate) {
    const absAverageExpense = Math.abs(averageExpense);
    const absPredictedExpense = Math.abs(predictedExpense);

    const remainingBudget = monthlyIncome - absPredictedExpense;

    const inflationAdjustment = inflationRate > 0
        ? `Поточний рівень інфляції складає ${inflationRate.toFixed(2)}%. Це може вплинути на ваші витрати. `
        : `Поточний рівень дефляції складає ${Math.abs(inflationRate).toFixed(2)}%. Це може позитивно вплинути на ваш бюджет.`;

    if (remainingBudget < 0) {
        return (
            `⚠️ Передбачувані витрати (${absPredictedExpense} грн) перевищують ваш дохід (${monthlyIncome} грн), залишок становить ${remainingBudget.toFixed(2)} грн. ` +
            `${inflationAdjustment}Рекомендуємо негайно скоротити витрати!`
        );
    } else if (overBudget) {
        return (
            `⚠️ Передбачувані витрати (${absPredictedExpense} грн) перевищують ваш середній бюджет (${absAverageExpense} грн). ` +
            `Залишок після врахування доходу: ${remainingBudget.toFixed(2)} грн. ${inflationAdjustment}Будьте обережні з витратами!`
        );
    } else {
        return (
            `✅ Ваші передбачувані витрати (${absPredictedExpense} грн) знаходяться в межах доступного доходу (${monthlyIncome} грн) і середнього бюджету (${absAverageExpense} грн). ` +
            `Залишок: ${remainingBudget.toFixed(2)} грн. ${inflationAdjustment} Добра робота!`
        );
    }
}

export { getCategoryInsights, getOverBudgetMessage };